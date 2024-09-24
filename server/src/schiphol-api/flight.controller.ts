import { Controller, Get, Query, Param } from '@nestjs/common';
import { FlightsService } from './flight.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  getFlights(@Query() queryParams: any) {
    return this.flightsService.getFlights(queryParams);
  }
  @Get('getFlightsWithDetails')
  getFlightsWithDetails(@Query() queryParams: any) {
    return this.flightsService.getFlightsWithDetails(queryParams);
  }

  @Get(':id')
  getFlightById(@Param('id') id: string) {
    return this.flightsService.getFlightById(id);
  }
}
