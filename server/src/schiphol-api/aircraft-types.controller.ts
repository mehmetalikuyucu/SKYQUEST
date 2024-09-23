import { Controller, Get, Query } from '@nestjs/common';
import { AircraftTypesService } from './aircraft-types.service';

@Controller('aircraft-types')
export class AircraftTypesController {
  constructor(private readonly aircraftTypesService: AircraftTypesService) {}

  @Get()
  getAircraftTypes(@Query() queryParams: any) {
    return this.aircraftTypesService.getAircraftTypes(queryParams);
  }
}
