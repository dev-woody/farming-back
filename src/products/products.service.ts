import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Option } from "./entities/option.entity";
import { Item_Option } from "./entities/item_option.entity";
import { createItemOptionDto } from "./dto/create-item-option..dto";
import { createOptionDto } from "./dto/create-option.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Option)
    private optionRepository: Repository<Option>,

    @InjectRepository(Item_Option)
    private optionItemRepository: Repository<Item_Option>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productEntity = this.productRepository.create(createProductDto);
    const optionEntity = await Promise.all(
      createProductDto.options.map(async (option: createOptionDto) => {
        const optionEntity = this.optionRepository.create(option);
        const itemOptionEntity = await Promise.all(
          option.option_item.map(async (item: createItemOptionDto) => {
            return await this.optionItemRepository.save(
              this.optionItemRepository.create(item),
            );
          }),
        );
        optionEntity.option_item = itemOptionEntity;
        return await this.optionRepository.save(optionEntity);
      }),
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
        uuid: id,
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

  async findById(uuid: string) {
    const product = await this.productRepository.findOne({
      where: {
        uuid,
      },
    });
    if (!product)
      throw new HttpException(
        "상품이 존재하지 않습니다.",
        HttpStatus.BAD_REQUEST,
      );
    return product;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   const productEntity = this.productRepository.create(updateProductDto);
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
