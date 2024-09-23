import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseInitModule } from './databaseInitModule';
import { HttpModule } from '@nestjs/axios';
import { SchipholApiModule } from './schiphol-api/schiphol-api.module';
import { ReservationModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseInitModule,
    MongooseModule.forRoot('mongodb://appfellas:appfellas@db:27017/appfellas'),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    SchipholApiModule,
    ReservationModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
