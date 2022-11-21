import { OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateDestinatarioDto } from "src/destinatarios/dto/create-destinatario.dto";
import { NotificacoesService } from "src/notificacoes/notificacoes.service";

@Processor('sendNotificacao-queue')
class SendNotificacaoConsumer {
  constructor(
    private notificacoesService: NotificacoesService,
  ){}

  @Process('sendNotificacao-job')
  async sendNotificacaoJob(job: Job<CreateDestinatarioDto>) {
    const { data } = job
    const notificacao = await this.notificacoesService.findOne(data.notificacaoId)

    console.log(data)

    console.log("ExpoPushToken: " + data.expoPushToken)
    console.log("Título: " + notificacao.titulo)
    console.log("Mensagem: " + notificacao.mensagem)
    console.log("User: " + notificacao.user)

    await this.notificacoesService.sendNotificacao({
      to: data.expoPushToken,
      title: notificacao.titulo,
      message: notificacao.mensagem
    })
  }

  @OnQueueCompleted()
  async onComplete(job: Job) {
    const { data } = job
    
    console.log(`On Completed`)
    console.log(data)
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`)
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`)
  }

}

export { SendNotificacaoConsumer }