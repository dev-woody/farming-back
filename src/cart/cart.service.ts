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
import { Product } from "src/products/entities/product.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private prodRepository: Repository<Product>,

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
            cart_item_opts.prod_opt_val =
              await this.prodOptValRepository.findOne({
                where: {
                  uuid: option_item.uuid,
                },
              });
            return await this.cartItemOptionRepository.save(cart_item_opts);
          }),
        );

        cartItemEntity.cart_item_opts = cartItemOptionEntity;
        cartItemEntity.product = await this.prodRepository.findOne({
          where: { uuid: CreateCartDto.product },
        });
        return await this.cartItemRepository.save(cartItemEntity);
      }),
    );
    cart.cart_items = cartItems;

    cartItems.map(async (cartItem: Cart_Item) => {
      const cartDB = await this.cartItemRepository.findOne({
        where: {
          uuid: cartItem.uuid,
        },
        relations: ["cart_item_opts", "cart_item_opts.prod_opt_val"],
      });

      const totalAmount = cartDB.cart_item_opts.reduce((total, option) => {
        return total + option.prod_opt_val.opt_price * option.quantity;
      }, 0);

      cartItem.total_amount =
        totalAmount - totalAmount * (cartItem.product.sale_rate / 100);
    });
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
