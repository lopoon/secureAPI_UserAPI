import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedAuthModule, JwtAuthGuard, ScopesGuard } from '@lopoon/shared-auth-module'; // import JwtAuthGuard for authorization
import { KnexModule } from 'nest-knexjs';
import dbConfig from '../database/db.config';

@Module({
  imports: [
    SharedAuthModule,
    KnexModule.forRoot({
      config: dbConfig,
    })
  ],
  providers: [UserService, JwtAuthGuard, ScopesGuard],
  controllers: [UserController]
})
export class UserModule { }
