import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensagensModule } from './mensagens/mensagens.module';
import { DestinatariosModule } from './destinatarios/destinatarios.module';
import { ConfigModule } from '@nestjs/config';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_HOST),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './storage',
      }),
    }),
    MensagensModule,
    DestinatariosModule,
    NotificacoesModule,
    FilesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
