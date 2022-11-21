import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateDestinatarioDto } from "src/destinatarios/dto/create-destinatario.dto";

@Injectable()
class SendMailProducerService {

  constructor(@InjectQueue('sendMail-queue') private queue: Queue){}

  async sendMail(createDestinatarioDTO: CreateDestinatarioDto){
    console.log("SEND MAIL - PRODUCER")
    await this.queue.add("sendMail-job", createDestinatarioDTO, {
      delay: 5000
    })
  }

}

export { SendMailProducerService }