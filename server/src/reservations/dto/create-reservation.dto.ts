import { IsNotEmpty, IsString, IsDateString, IsISO8601 } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  flightNumber: string;

  @IsNotEmpty()
  @IsDateString()
  departureDate: string;

  @IsNotEmpty()
  @IsDateString()
  arrivalDate: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;
}