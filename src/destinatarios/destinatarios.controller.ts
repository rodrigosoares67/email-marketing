import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { SendNotificacaoProducerService } from 'src/jobs/sendNotificacao-producer-service';
import { DestinatariosService } from './destinatarios.service';
import { UpdateDestinatarioDto } from './dto/update-destinatario.dto';

@Controller('destinatarios')
export class DestinatariosController {
  constructor(
    private readonly destinatariosService: DestinatariosService,
    private sendMailService: SendMailProducerService,
    private sendNotificacaoService: SendNotificacaoProducerService
  ) {}

  @Post()
  async create(@Body() request) {
    console.log(request.mensagem)
    console.log(request.notificacao)

    const destinatarios = request.destinatarios
    const mensagem = request.mensagem
    const notificacao = request.notificacao
    
    destinatarios.map((destinatario) => {
      if(mensagem?._id !== undefined) {
        // @ts-ignore
        destinatario = {...destinatario, mensagemId: mensagem._id}

        this.destinatariosService.create(destinatario)
        this.sendMailService.sendMail(destinatario)
      } else if(notificacao?._id !== undefined){
        // @ts-ignore
        destinatario = {...destinatario, notificacaoId: notificacao._id}

        this.destinatariosService.create(destinatario)
        this.sendNotificacaoService.sendNotificacao(destinatario)
      }

      
    })
  }

  @Get()
  findAll() {
    return this.destinatariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinatariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDestinatarioDto: UpdateDestinatarioDto) {
    return this.destinatariosService.update(id, updateDestinatarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destinatariosService.remove(id);
  }
}
