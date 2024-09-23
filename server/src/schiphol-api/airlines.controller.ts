import { Controller, Get, Query, Param } from '@nestjs/common';
import { AirlinesService } from './airlines.service';

@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @Get()
  getAirlines(@Query() queryParams: any) {
    return this.airlinesService.getAirlines(queryParams);
  }

  @Get(':code')
  getAirlineByCode(@Param('code') code: string) {
    return this.airlinesService.getAirlineByCode(code);
  }
}
