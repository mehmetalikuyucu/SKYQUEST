import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  flightId: string;

  @Prop({ required: true })
  flightName: string;

  @Prop({ required: true })
  flightNumber: number;

  @Prop({ required: true })
  scheduleDateTime: Date;

  @Prop({ required: true })
  flightDirection: string;

  @Prop({ type: Object, required: true })
  route: {
    destinations: string[];
    eu: string;
    visa: boolean;
  };

  @Prop({ type: [String], required: true })
  flightStates: string[];

  @Prop({ required: false })
  terminal: number;

  @Prop({ type: Object, required: true })
  aircraftType: {
    iataMain: string;
    iataSub: string;
    longDescription: string;
    shortDescription: string;
  };

  @Prop({ type: Object, required: true })
  destination: {
    city: string;
    country: string;
    iata: string;
  };

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
