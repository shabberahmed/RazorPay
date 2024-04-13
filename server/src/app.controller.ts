import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('key')
  getHello(@Res() res: any): any {
    const response = this.appService.getKey();
    return res.json({ m: response });
  }

  @Get('secretkey')
  getData(): string {
    return this.appService.getSecretKey();
  }
}
