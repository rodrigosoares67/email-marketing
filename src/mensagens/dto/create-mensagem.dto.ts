import { File } from "src/files/entities/file.entity";

export class CreateMensagemDto {
  assunto: string;
  conteudo: string;
  user: string;
  anexos: [];
}