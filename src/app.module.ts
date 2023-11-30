import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedAppModule }  from '@lopoon/shared-auth-module';

@Module({
  imports: [UserModule, SharedAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
