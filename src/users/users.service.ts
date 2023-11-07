import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { AuthDTO } from "src/auth/dto/auth.dto";
import { Cart } from "src/cart/entities/cart.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = this.userRepository.create(authDTO);
    const cartEntity = this.cartRepository.create(userEntity);
    userEntity.carts = cartEntity;
    return await this.userRepository.save(userEntity);
  }

  async findById(uuid: string) {
    const user = await this.userRepository.findOne({
      where: {
        uuid,
      },
      relations: [
        "carts",
        "carts.cart_items",
        "carts.cart_items.cart_item_opts",
        "reviews",
      ],
    });
    if (!user)
      throw new HttpException(
        "존재하지 않는 유저입니다.",
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }

  async findCart(uuid: string) {
    const user = await this.userRepository.findOne({
      where: {
        uuid,
      },
      relations: [
        "carts",
        "carts.cart_items",
        "carts.cart_items.cart_item_opts",
        "reviews",
      ],
    });
    if (!user)
      throw new HttpException(
        "존재하지 않는 유저입니다.",
        HttpStatus.BAD_REQUEST,
      );
    return user.carts;
  }

  async findByUserId(user_id: string) {
    return await this.userRepository.findOne({
      where: {
        user_id,
      },
      select: [
        "uuid",
        "name",
        "profile_img",
        "user_id",
        "password",
        "phone",
        "email",
        "zip_code",
        "address",
        "address_detail",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
