import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MensagemDocument = Mensagem & Document;

@Schema()
export class Mensagem {

  @Prop()
  assunto: string;

  @Prop()
  conteudo: string;

  @Prop()
  user: string;

  @Prop()
  anexos: []
}

export const MensagemSchema = SchemaFactory.createForClass(Mensagem);