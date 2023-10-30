import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { CreateCartListDto } from "./dto/create-cartList.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createCartListDto: CreateCartListDto) {
    const { user_id, prod_id } = createCartListDto;
    const user = await this.userRepository.findOne({
      where: {
        uuid: user_id,
      },
    });
    const product = await this.productRepository.findOne({
      where: {
        id: prod_id,
      },
    });
    const cart_prod = await this.cartRepository.findOne({
      where: {
        prod_id: prod_id,
      },
    });

    if (!user)
      throw new HttpException(
        "존재하지 않는 유저입니다.",
        HttpStatus.BAD_REQUEST,
      );
    if (!product)
      throw new HttpException(
        "존재하지 않는 상품입니다.",
        HttpStatus.BAD_REQUEST,
      );
    if (cart_prod)
      return await this.cartRepository.update(prod_id, createCartListDto);

    const cartEntity = this.cartRepository.create(createCartListDto);
    return "success";
    // return await this.cartRepository.save(cartEntity);
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

  update(prod_id: string, createCartListDto: CreateCartListDto) {
    return this.cartRepository.update(prod_id, createCartListDto);
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
