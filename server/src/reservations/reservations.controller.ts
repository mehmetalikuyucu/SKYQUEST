import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    return this.reservationService.create(createReservationDto, req.user as UserDocument);
  }

  @Get()
  findAll(@Request() req) {
    return this.reservationService.findAll(req.user as UserDocument);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.reservationService.findOne(id, req.user as UserDocument);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: CreateReservationDto, @Request() req) {
    return this.reservationService.update(id, updateReservationDto, req.user as UserDocument);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.reservationService.remove(id, req.user as UserDocument);
  }
}