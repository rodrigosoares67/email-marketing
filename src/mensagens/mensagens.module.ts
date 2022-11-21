import { Module } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { MensagensController } from './mensagens.controller';
import { Mensagem, MensagemSchema } from './entities/mensagem.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from 'src/files/files.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'mensagens', schema: MensagemSchema }]),
    MensagensModule
  ],
  controllers: [
    MensagensController,
  ],
  providers: [
    MensagensService,
  ],
  exports: [
    MensagensService
  ]
})
export class MensagensModule {}
