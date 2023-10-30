import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(CreateCartDto: CreateCartDto) {
    const cartEntity = this.cartRepository.create(CreateCartDto);
    return await this.cartRepository.save(cartEntity);
  }

  async findAll(user_id: string) {
    return await this.cartRepository.find({
      where: {
        user_id: user_id,
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

  async findProductId(id: string) {
    return await this.cartRepository.findOne({});
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartRepository.update(id, updateCartDto);
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
