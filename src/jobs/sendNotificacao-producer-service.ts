import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateDestinatarioDto } from "src/destinatarios/dto/create-destinatario.dto";

@Injectable()
class SendNotificacaoProducerService {

  constructor(@InjectQueue('sendNotificacao-queue') private queue: Queue){}

  async sendNotificacao(createDestinatarioDTO: CreateDestinatarioDto){
    console.log("SEND NOTIFICACAO - PRODUCER")
    await this.queue.add("sendNotificacao-job", createDestinatarioDTO, {
      delay: 5000
    })
  }

}

export { SendNotificacaoProducerService }