// reservations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decarator';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @User() user) {
    return this.reservationService.create(createReservationDto, user);
  }

  @Get()
  findAll(@User() user) {
    return this.reservationService.findAllByUserId(user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.reservationService.remove(id, user);
  }
}
