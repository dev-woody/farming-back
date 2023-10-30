import { Injectable } from "@nestjs/common";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Upload } from "./entities/upload.entity";
import { Repository } from "typeorm";

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {}
  async uploadFile(file: Express.Multer.File, uploadDto: CreateUploadDto) {
    const uploadEntity = this.uploadRepository.create({
      kind: uploadDto.kind,
      path: file.path,
    });
    const saveImage = await this.uploadRepository.save(uploadEntity);
    return { path: file.path, iamge_id: saveImage.uuid };
  }

  async findAll() {
    return await this.uploadRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
