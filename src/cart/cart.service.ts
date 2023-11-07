import { Injectable } from "@nestjs/common";
import {
  CreateCartDto,
  Cart_ItemDto,
  Cart_OptDto,
} from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart_Item_Option } from "./entities/cart_item_option.entity";
import { Cart_Item } from "./entities/cart_item.entity";
import { Prod_Option_Val } from "src/products/entities/option_item_val.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(Cart_Item)
    private cartItemRepository: Repository<Cart_Item>,

    @InjectRepository(Cart_Item_Option)
    private cartItemOptionRepository: Repository<Cart_Item_Option>,

    @InjectRepository(Prod_Option_Val)
    private prodOptValRepository: Repository<Prod_Option_Val>,
  ) {}

  async create(CreateCartDto: CreateCartDto) {
    const cart = await this.cartRepository.findOne({
      where: {
        user: { uuid: CreateCartDto.user },
      },
    });
    const cartItems = await Promise.all(
      CreateCartDto.items.map(async (cart_items: Cart_ItemDto) => {
        const cartItemEntity = this.cartItemRepository.create(cart_items);
        const cartItemOptionEntity = await Promise.all(
          cart_items.options.map(async (option_item: Cart_OptDto) => {
            const cart_item_opts =
              this.cartItemOptionRepository.create(option_item);
            cart_item_opts.prod_opt_val = option_item.uuid;
            return await this.cartItemOptionRepository.save(cart_item_opts);
          }),
        );

        cartItemEntity.cart_item_opts = cartItemOptionEntity;
        cartItemEntity.product = CreateCartDto.product;
        cartItemEntity.total_price = await Promise.all(
          cartItemEntity.cart_item_opts.map((opts: Cart_Item_Option) => {
            const prod_opt_valEntity = this.prodOptValRepository.findOne({
              where: {
                uuid: opts.prod_opt_val,
              },
              select: { opt_price: true },
            });
            return opts.quantity * prod_opt_valEntity;
          }),
        );
        return await this.cartItemRepository.save(cartItemEntity);
      }),
    );
    cart.cart_items = cartItems;
    // cartEntity.cart_items = cartItemEntity;
    // cartEntity.user = CreateCartDto.user;
    return await this.cartRepository.save(cart);
    // return cartEntity;
  }

  async findAll() {
    return await this.cartRepository.find({
      relations: [
        "user_uuid",
        "cart_items",
        "cart_items.cart_item_opts",
        "cart_items.product",
        "cart_items.cart_item_opts.prod_opt_val",
      ],
    });
  }

  async findUserId(uuid: string) {
    return await this.cartRepository.findOne({
      where: {
        user: { uuid: uuid },
      },
      relations: [
        "cart_items",
        "cart_items.cart_item_opts",
        "cart_items.product",
        "cart_items.cart_item_opts.prod_opt_val",
      ],
    });
  }

  async findProductId(prod_id: string) {
    return await this.cartRepository.findOne({
      // where: {
      //   prod_id,
      // },
    });
  }

  async findOne(id: string) {
    return await this.cartRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    // return await this.cartRepository.update(id, updateCartDto);
  }

  async remove(uuid: string) {
    return await this.cartRepository.delete(uuid);
  }
}
