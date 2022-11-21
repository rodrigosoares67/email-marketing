import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

const winston = require('winston');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    /*httpsOptions: {
      cert: fs.readFileSync('/etc/ascerts/mailmarketing.crt'),
      key: fs.readFileSync('/etc/ascerts/mailmarketing.key')
    }*/
  });
  
  app.use(bodyParser.json({limit: '500mb'}));
  app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
  app.enableCors();
  
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: 'logs/console.log'
      })
    ]
  });

  logger.info(`[${new Date()}] Iniciando aplicação E-mail Marketing'`);
  await app.listen(3010);
}
bootstrap();
