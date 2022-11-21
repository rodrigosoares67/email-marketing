//import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateDestinatarioDto } from "src/destinatarios/dto/create-destinatario.dto";
import { MensagensService } from "src/mensagens/mensagens.service";

const rootDir = require('path').resolve('./');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(
    //private mailService: MailerService,
    private mensagensService: MensagensService,
  ){}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateDestinatarioDto>) {
    const {data } = job
    const mensagem = await this.mensagensService.findOne(data.mensagemId)
    const anexos = Array.from(mensagem.anexos)

    console.log(data)

    console.log("Email: " + data.email)
    console.log("Subject: " + mensagem.assunto)
    console.log("Text: " + mensagem.conteudo)
    console.log("Anexos: " + anexos)

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      logger: true,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        secure: false,
        ignoreTLS: true,
        rejectUnauthorized: false
      }
    });

    console.log("TRANSPORTER = " + transporter)

    let options = {
      viewEngine : {
        extname: '.hbs', // handlebars extension
        layoutsDir: rootDir + '/src/mail/templates/', // location of handlebars templates
        defaultLayout: 'padrao', // name of main template
        partialsDir: rootDir + '/src/mail/templates/', // location of your subtemplates aka. header, footer etc
      },
      viewPath: rootDir + '/src/mail/templates/',
      extName: '.hbs'
    };

    transporter.use('compile', hbs(options));

    let anexosAttach = anexos.map((anexo: any) => {
      return (
        anexo.nome && (
          {
            filename: anexo.nome,
            path: rootDir + '/' + anexo.url
          }
        )
      )
    })

    let mail = {
      from: process.env.MAIL_USER,
      to: data.email,
      cc: process.env.MAIL_CC,
      subject: mensagem.assunto,
      attachments: anexosAttach,
      template: 'padrao',
      context: {
        assunto: mensagem.assunto,
        conteudo: mensagem.conteudo
      },
    }

    transporter.sendMail(mail, function (error, info){
      if (error) {
        console.log("Error in sendMail:");
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  @OnQueueCompleted()
  async onComplete(job: Job) {
    const { data } = job
    
    console.log(`On Completed`)
    console.log(data)
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`)
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`)
  }

}

export { SendMailConsumer }