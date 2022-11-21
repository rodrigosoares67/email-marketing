import { Injectable, Module } from '@nestjs/common';
import { DestinatariosService } from './destinatarios.service';
import { DestinatariosController } from './destinatarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Destinatario, DestinatarioSchema } from './entities/destinatario.entity';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { SendMailConsumer } from 'src/jobs/sendMail-consumer';
import { MensagensModule } from 'src/mensagens/mensagens.module';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { NotificacoesModule } from 'src/notificacoes/notificacoes.module';
import { SendNotificacaoProducerService } from 'src/jobs/sendNotificacao-producer-service';
import { SendNotificacaoConsumer } from 'src/jobs/sendNotificacao-consumer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Destinatario.name, schema: DestinatarioSchema }]),
    BullModule.registerQueue(
      {
        name: 'sendMail-queue',
      },
      {
        name: 'sendNotificacao-queue',
      }
    ),
    MensagensModule,
    NotificacoesModule
  ],
  controllers: [
    DestinatariosController
  ],
  providers: [
    DestinatariosService,
    SendMailProducerService,
    SendMailConsumer,
    SendNotificacaoProducerService,
    SendNotificacaoConsumer
  ],
})

export class DestinatariosModule {
  constructor(
    @InjectQueue('sendMail-queue')
    private sendMailQueue: Queue,

    @InjectQueue('sendNotificacao-queue')
    private sendNotificacaoQueue: Queue
  ){}

  configure(consumer: MiddlewareBuilder){
    const { router } = createBullBoard(
      [
        new BullAdapter(this.sendMailQueue), 
        new BullAdapter(this.sendNotificacaoQueue)
      ]
    )

    consumer.apply(router).forRoutes("/admin/queues")
  }
}
