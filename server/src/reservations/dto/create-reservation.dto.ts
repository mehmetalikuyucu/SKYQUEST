import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsObject,
  IsArray,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  flightId: string;

  @IsNotEmpty()
  @IsString()
  flightName: string;

  @IsNotEmpty()
  @IsNumber()
  flightNumber: number;

  @IsNotEmpty()
  @IsDateString()
  scheduleDateTime: string;

  @IsNotEmpty()
  @IsString()
  flightDirection: string;

  @IsNotEmpty()
  @IsObject()
  route: {
    destinations: string[];
    eu: string;
    visa: boolean;
  };

  @IsNotEmpty()
  @IsArray()
  flightStates: string[];

  @IsNotEmpty()
  @IsNumber()
  terminal: number;

  @IsNotEmpty()
  @IsObject()
  aircraftType: {
    iataMain: string;
    iataSub: string;
    longDescription: string;
    shortDescription: string;
  };

  @IsNotEmpty()
  @IsObject()
  destination: {
    city: string;
    country: string;
    iata: string;
  };
}
