import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type NotificacaoDocument = Notificacao & Document;

@Schema()
export class Notificacao {

  @Prop()
  titulo: string;

  @Prop()
  mensagem: string;

  @Prop()
  user: string;
}

export const NotificacaoSchema = SchemaFactory.createForClass(Notificacao);