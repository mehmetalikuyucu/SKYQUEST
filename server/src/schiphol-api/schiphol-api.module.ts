import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { FlightsService } from './flight.service';
import { AirlinesService } from './airlines.service';
import { AircraftTypesService } from './aircraft-types.service';
import { DestinationsService } from './destinations.service';

import { FlightsController } from './flight.controller';
import { AirlinesController } from './airlines.controller';
import { AircraftTypesController } from './aircraft-types.controller';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [
    FlightsService,
    AirlinesService,
    AircraftTypesService,
    DestinationsService,
  ],
  controllers: [
    FlightsController,
    AirlinesController,
    AircraftTypesController,
    DestinationsController,
  ],
  exports: [
    FlightsService,
    AirlinesService,
    AircraftTypesService,
    DestinationsService,
  ],
})
export class SchipholApiModule {}
