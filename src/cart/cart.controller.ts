import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { JwtAccesshGuard } from "src/auth/guard/auth.guard";
import { UsersService } from "src/users/users.service";
import { ProductsService } from "src/products/products.service";

@Controller("cart")
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly userService: UsersService,
    private readonly productServie: ProductsService,
  ) {}

  // @UseGuards(AuthGuard)
  @Post("/create")
  async create(@Body() createCartDto: CreateCartDto) {
    await this.userService.findById(createCartDto.user);
    // await this.productServie.findById(createCartDto.prod_id);
    // const isUnEmpty = await this.cartService.findProductId(
    //   createCartDto.prod_id,
    // );
    // if (isUnEmpty) {
    //   this.cartService.remove(isUnEmpty.uuid);
    //   return this.cartService.create(createCartDto);
    // }
    return this.cartService.create(createCartDto);
  }

  @UseGuards(JwtAccesshGuard)
  @Get("/")
  async findByUserId(@Req() req: any) {
    const user = req.user;
    return this.cartService.findUserId(user.uuid);
    // return this.cartService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(id);
  }
}
