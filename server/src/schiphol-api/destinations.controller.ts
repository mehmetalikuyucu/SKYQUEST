import { Controller, Get, Query, Param } from '@nestjs/common';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  getDestinations(@Query() queryParams: any) {
    return this.destinationsService.getDestinations(queryParams);
  }
  @Get('all')
  getAllDestinations() {
    return this.destinationsService.getAllDestinations();
  }

  @Get(':iata')
  getDestinationByIata(@Param('iata') iata: string) {
    return this.destinationsService.getDestinationByIata(iata);
  }
}
