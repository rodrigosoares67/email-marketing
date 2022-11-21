import mongoose from "mongoose";
import { Mensagem } from "src/mensagens/entities/mensagem.entity";

export class CreateDestinatarioDto {
  email: string;
  codigo_protheus: string;
  mensagemId: string;
  notificacaoId: string;
  status: string;
  user: string;
  expoPushToken: string;
}
