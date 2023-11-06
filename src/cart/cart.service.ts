import { Injectable } from "@nestjs/common";
import {
  CreateCartDto,
  Cart_OptionDto,
  Cart_Option_ValsDto,
} from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart_Item_Option } from "./entities/cart_item_option.entity";
import { Cart_Item } from "./entities/cart_item.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(Cart_Item)
    private cartItemRepository: Repository<Cart_Item>,

    @InjectRepository(Cart_Item_Option)
    private cartItemOptionRepository: Repository<Cart_Item_Option>,
  ) {}

  async create(CreateCartDto: CreateCartDto) {
    const cartEntity = this.cartRepository.create(CreateCartDto);
    const cartItemEntity = await Promise.all(
      CreateCartDto.options.map(async (cart_option: Cart_OptionDto) => {
        const cartItemOptionEntity =
          this.cartItemRepository.create(cart_option);
        const cartItemOptionValsEntity = await Promise.all(
          cart_option.option_items.map(
            async (option_item: Cart_Option_ValsDto) => {
              return await this.cartItemOptionRepository.save(
                this.cartItemOptionRepository.create(option_item),
              );
            },
          ),
        );
        cartItemOptionEntity.cart_item_options = cartItemOptionValsEntity;
        return await this.cartItemRepository.save(cartItemOptionEntity);
      }),
    );
    cartEntity.cart_items = cartItemEntity;
    cartEntity.user_uuid = CreateCartDto.user_uuid;
    return await this.cartRepository.save(cartEntity);
    // return cartEntity;
  }

  async findAll() {
    return await this.cartRepository.find({
      relations: ["user_uuid", "cart_items", "cart_items.cart_item_options"],
    });
  }

  async findKey() {
    return await this.cartRepository.find({
      select: {
        user_uuid: true,
      },
    });
  }

  async findUserId(uuid: string) {
    return await this.cartRepository.find({
      where: {
        user_uuid: uuid,
      },
      relations: ["user_uuid", "cart_items", "cart_items.cart_item_options"],
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
