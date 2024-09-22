import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
  ],
  providers: [FlightService],
  controllers: [FlightController],
  exports: [FlightService],
})
export class FlightsModule {}