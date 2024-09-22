import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: UserDocument): Promise<Reservation> {
    const createdReservation = new this.reservationModel({
      ...createReservationDto,
      user: user._id,
      departureDate: new Date(createReservationDto.departureDate),
      arrivalDate: new Date(createReservationDto.arrivalDate),
    });
    return createdReservation.save();
  }

  async findAll(user: UserDocument): Promise<Reservation[]> {
    return this.reservationModel.find({ user: user._id }).exec();
  }

  async findOne(id: string, user: UserDocument): Promise<Reservation> {
    return this.reservationModel.findOne({ _id: id, user: user._id }).exec();
  }

  async update(id: string, updateReservationDto: CreateReservationDto, user: UserDocument): Promise<Reservation> {
    return this.reservationModel.findOneAndUpdate(
      { _id: id, user: user._id },
      { 
        ...updateReservationDto,
        departureDate: new Date(updateReservationDto.departureDate),
        arrivalDate: new Date(updateReservationDto.arrivalDate),
      }, 
      { new: true }
    ).exec();
  }

  async remove(id: string, user: UserDocument): Promise<Reservation> {
    return this.reservationModel.findOneAndDelete({ _id: id, user: user._id }).exec();
  }
}