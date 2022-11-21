import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISendNotificacaoOptions } from 'src/@types/ISendNotificacaoOptions';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { NotificacaoDocument } from './entities/notificacao.entity';
import axios from 'axios';

@Injectable()
export class NotificacoesService {

  constructor(@InjectModel('notificacoes') private notificacaoModel: Model<NotificacaoDocument>) {}

  create(createNotificacaoDto: CreateNotificacaoDto) {
    console.log(createNotificacaoDto);
    const notificacao = new this.notificacaoModel(createNotificacaoDto)
    return notificacao.save()
  }

  findAll() {
    return this.notificacaoModel.find()
  }

  findOne(id: string) {
    console.log("FIND ONE: " + id)
    return this.notificacaoModel.findById(id)
  }

  update(id: string, updateNotificacaoDto: UpdateNotificacaoDto) {
    return this.notificacaoModel.findByIdAndUpdate({
      _id: id,
    },
    {
      $set: updateNotificacaoDto
    },
    {
      new: true
    }
    )
  }

  remove(id: string) {
    return this.notificacaoModel.deleteOne({
      _id: id
    }).exec()
  }

  async sendNotificacao(sendNotifiacaoOptions: ISendNotificacaoOptions){
    console.log("SEND NOTIFICACAO - SERVICE")
    
    const message = {
      to: sendNotifiacaoOptions.to,
      sound: 'default',
      title: sendNotifiacaoOptions.title,
      body: sendNotifiacaoOptions.message,
    };

    await axios({
      method: 'POST',
      url: `https://exp.host/--/api/v2/push/send`,
      data: JSON.stringify(message),
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      }
    }).then((response: any) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log(error)
    })
  }

}
