import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import multerOption from "./multer.option";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Upload } from "./entities/upload.entity";

@Module({
  imports: [
    MulterModule.register(multerOption()),
    TypeOrmModule.forFeature([Upload]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
