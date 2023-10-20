import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Option } from "./entities/option.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productEntity = this.productRepository.create(createProductDto);
    const optionEntity = await Promise.all(
      createProductDto.options.map(
        async (option) =>
          await this.optionRepository.save(
            this.optionRepository.create(option),
          ),
      ),
    );
    productEntity.options = optionEntity;
    return await this.productRepository.save(productEntity);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ["options", "reviews"],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ["options", "reviews"],
    });
    if (!product)
      throw new HttpException(
        "상품이 존재하지 않습니다.",
        HttpStatus.BAD_REQUEST,
      );
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productEntity = this.productRepository.create(updateProductDto);
    console.log(productEntity);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
