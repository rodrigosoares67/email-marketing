import { Module } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesController } from './notificacoes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificacaoSchema } from './entities/notificacao.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'notificacoes', schema: NotificacaoSchema }])
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesService],
  exports: [NotificacoesService]
})
export class NotificacoesModule {}
