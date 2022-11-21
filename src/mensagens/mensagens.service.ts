import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { MensagemDocument } from './entities/mensagem.entity';

@Injectable()
export class MensagensService {

  constructor(@InjectModel('mensagens') private mensagemModel: Model<MensagemDocument>) {}

  create(createMensagemDto: CreateMensagemDto) {
    console.log(createMensagemDto)
    const mensagem = new this.mensagemModel(createMensagemDto)
    return mensagem.save()
  }

  findAll() {
    return this.mensagemModel.find()
  }

  findOne(id: string) {
    console.log("FIND ONE: " + id)
    return this.mensagemModel.findById(id)
  }

  update(id: string, updateMensagemDto: UpdateMensagemDto) {
    return this.mensagemModel.findByIdAndUpdate({
      _id: id,
    },
    {
      $set: updateMensagemDto
    },
    {
      new: true
    }
    )
  }

  remove(id: string) {
    return this.mensagemModel.deleteOne({
      _id: id
    }).exec()
  }
}
