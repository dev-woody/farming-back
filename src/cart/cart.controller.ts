import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { CreateCartListDto } from "./dto/create-cartList.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createCartListDto: CreateCartListDto) {
    return this.cartService.create(createCartListDto);
  }

  @Get()
  findAll(@Body() user_id: string) {
    return this.cartService.findAll(user_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() createCartListDto: CreateCartListDto,
  ) {
    return this.cartService.update(id, createCartListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(+id);
  }
}
