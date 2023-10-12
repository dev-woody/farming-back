import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Body,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUploadDto } from "./dto/create-upload.dto";

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(`/upload`)
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: ".(jpg|jpeg|png)$",
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() uploadDto: CreateUploadDto,
  ) {
    return this.uploadService.uploadFile(file, uploadDto);
  }

  @Get("/download")
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.uploadService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.uploadService.remove(+id);
  }
}
