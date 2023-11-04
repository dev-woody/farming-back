import { Injectable } from "@nestjs/common";
import {
  Cart_Option,
  Cart_Option_Item,
  CreateCartDto,
} from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart_Item } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart_Prod_Option_Val } from "./entities/cart_prod_option_val.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart_Item)
    private cartRepository: Repository<Cart_Item>,

    @InjectRepository(Cart_Prod_Option_Val)
    private cartItemOptionRepository: Repository<Cart_Prod_Option_Val>,
  ) {}

  async create(CreateCartDto: CreateCartDto) {
    // const cartEntity = this.cartRepository.create(CreateCartDto);
    const cartItemOptionEntity = await Promise.all(
      CreateCartDto.options.map(async (cart_option: Cart_Option) => {
        const cartEntity = this.cartRepository.create(cart_option);
        const cartItemOptionEntity = await Promise.all(
          cart_option.option_items.map(
            async (option_item: Cart_Option_Item) => {
              const cart_option_item =
                this.cartItemOptionRepository.create(option_item);
              return await this.cartItemOptionRepository.save(cart_option_item);
            },
          ),
        );
        cartEntity.cart_prod_option_vals = cartItemOptionEntity;
        cartEntity.user_id = CreateCartDto.user_id;
        cartEntity.prod_id = CreateCartDto.prod_id;
        return await this.cartRepository.save(cartEntity);
      }),
    );
    return cartItemOptionEntity;
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  async findAUserId(uuid: string) {
    return await this.cartRepository.find({
      where: {
        user_id: uuid,
      },
      relations: ["cart_prod_option_vals"],
    });
  }

  async findProductId(prod_id: string) {
    return await this.cartRepository.findOne({
      where: {
        prod_id,
      },
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
    return await this.cartRepository.update(id, updateCartDto);
  }

  async remove(uuid: string) {
    return await this.cartRepository.delete(uuid);
  }
}
