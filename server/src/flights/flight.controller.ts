import { Controller, Get, Query, Param } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get()
  getFlights(
    @Query() queryParams: any
  ) {
    console.log("asdasdasd");
    return this.flightService.getFlights(queryParams);
  }

  @Get(':id')
  getFlightById(@Param('id') id: string) {
    return this.flightService.getFlightById(id);
  }

  @Get('airlines')
  getAirlines(@Query() queryParams: any) {
    console.log("asdasdasd");
    return this.flightService.getAirlines(queryParams);
  }

  @Get('airlines/:code')
  getAirlineByCode(@Param('code') code: string) {
    return this.flightService.getAirlineByCode(code);
  }

  @Get('aircrafttypes')
  getAircraftTypes(@Query() queryParams: any) {
    return this.flightService.getAircraftTypes(queryParams);
  }

  @Get('destinations')
  getDestinations(@Query() queryParams: any) {
    return this.flightService.getDestinations(queryParams);
  }

  @Get('destinations/:iata')
  getDestinationByIata(@Param('iata') iata: string) {
    return this.flightService.getDestinationByIata(iata);
  }
}