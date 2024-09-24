import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    user: any,
  ): Promise<Reservation> {
    console.log('Creating reservation:', createReservationDto, user);
    const createdReservation = new this.reservationModel({
      ...createReservationDto,
      user: user.userId,
    });
    return createdReservation.save();
  }

  async findAllByUserId(userId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ user: userId }).exec();
  }

  async remove(id: string, user: any): Promise<Reservation> {
    return this.reservationModel
      .findOneAndDelete({ _id: id, user: user.userId })
      .exec();
  }
}
