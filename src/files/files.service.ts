import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileDocument } from './entities/file.entity';

@Injectable()
export class FilesService {

  constructor(@InjectModel('files') private fileModel: Model<FileDocument>) {}

  create(createFileDto: CreateFileDto) {
    console.log(createFileDto)
    const file = new this.fileModel(createFileDto)
    return file.save()
  }

  findAll() {
    return this.fileModel.find()
  }

  findOne(id: string) {
    console.log("FIND ONE: " + id)
    return this.fileModel.findById(id)
  }

  update(id: string, updateFileDto: UpdateFileDto) {
    return this.fileModel.findByIdAndUpdate({
      _id: id,
    },
    {
      $set: updateFileDto
    },
    {
      new: true
    }
    )
  }

  remove(id: string) {
    return this.fileModel.deleteOne({
      _id: id
    }).exec()
  }

  async uploadedFile(file) {
    console.log("upload File Service")
    const response = [];

    const fileResponse = {
      originalname: file.originalname,
      filename: file.filename,
    };

    let fileDTO: CreateFileDto = {
      nome: fileResponse.originalname,
      url: 'storage/' + fileResponse.filename
    }

    this.create(fileDTO)

    response.push(fileDTO)

    return response;
  }

  async uploadMultipleFiles(files) {
    console.log("upload Multiple Files Service")
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };

      let fileDTO: CreateFileDto = {
        nome: fileReponse.originalname,
        url: 'storage/' + file.originalname
      }

      this.create(fileDTO)

      response.push(fileDTO);
    });
    return response;
  }
}
