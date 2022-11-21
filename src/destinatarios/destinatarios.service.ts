import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDestinatarioDto } from './dto/create-destinatario.dto';
import { UpdateDestinatarioDto } from './dto/update-destinatario.dto';
import { Destinatario, DestinatarioDocument } from './entities/destinatario.entity';

@Injectable()
export class DestinatariosService {
  constructor(
    @InjectModel(Destinatario.name) private destinatarioModel: Model<DestinatarioDocument>,
  ) {}

  create(destinatario: CreateDestinatarioDto) {
    const dest = new this.destinatarioModel(destinatario)
    
    dest.save()

    return dest
  }

  findAll() {
    return this.destinatarioModel.find()
  }

  findOne(id: string) {
    return this.destinatarioModel.findById(id)
  }

  update(id: string, updateDestinatarioDto: UpdateDestinatarioDto) {
    console.log("UPDATE DESTINATARIO")
    console.log(`ID: ${id}`)

    return this.destinatarioModel.findByIdAndUpdate({
      _id: id,
    },
    {
      $set: updateDestinatarioDto
    },
    {
      new: true
    }
    )
  }

  remove(id: string) {
    return this.destinatarioModel.deleteOne({
      _id: id
    }).exec()
  }
}
