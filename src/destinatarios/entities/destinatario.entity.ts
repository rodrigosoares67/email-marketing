import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Document } from 'mongoose';
import { Mensagem } from "src/mensagens/entities/mensagem.entity";
import { Notificacao } from "src/notificacoes/entities/notificacao.entity";

export type DestinatarioDocument = Destinatario & Document;

@Schema()
export class Destinatario {

  @Prop()
  email: string;

  @Prop()
  codigo_protheus: string;

  @Prop()
  status: string;

  @Prop()
  user: string;

  @Prop()
  expoPushToken: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'mensagens' })
  @Type(() => Mensagem)
  mensagemId: Mensagem;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'notificacoes' })
  @Type(() => Notificacao)
  notificacaoId: Notificacao;
}

export const DestinatarioSchema = SchemaFactory.createForClass(Destinatario);