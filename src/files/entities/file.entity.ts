import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FileDocument = File & Document;

@Schema()
export class File {

  @Prop()
  nome: string;

  @Prop()
  url: string;

}

export const FileSchema = SchemaFactory.createForClass(File);