import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";

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

  async create(createCartDto: CreateCartDto) {
    const { user_id, prod_id } = createCartDto;
    const user = await this.userRepository.findOne({
      where: {
        user_id,
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
    if (cart_prod) return "존재하는 상품입니다.";

    const cartEntity = this.cartRepository.create(createCartDto);
    return await this.cartRepository.save(cartEntity);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    this.cartRepository.update(id, updateCartDto);
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
