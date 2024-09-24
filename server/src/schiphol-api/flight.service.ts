import { Injectable } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { Flight } from './models/flight.model';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DestinationsService } from './destinations.service';
import { AircraftTypesService } from './aircraft-types.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlightsService extends BaseApiService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
    private destinationsService: DestinationsService,
    private aircraftTypesService: AircraftTypesService,
  ) {
    super(httpService, configService);
  }

  getFlights(
    params: any,
  ): Observable<{ data: { flights: Flight[] }; pagination: any }> {
    return this.makeRequest('flights', params);
  }

  getFlightsWithDetails(
    params: any,
  ): Observable<{ data: any[]; pagination: any }> {
    return this.getFlights(params).pipe(
      switchMap((response) => {
        const flightsWithDetails = response.data.flights.map((flight) =>
          forkJoin({
            flight: Promise.resolve(flight),
            destinationDetails: this.destinationsService.getDestinationByIata(
              flight.route.destinations[0],
            ),
            aircraftTypeDetails:
              this.aircraftTypesService.getAircraftTypeByIata(
                flight.aircraftType.iataMain,
                flight.aircraftType.iataSub,
              ),
          }).pipe(
            map(({ flight, destinationDetails, aircraftTypeDetails }) => ({
              ...flight,
              destinationDetails,
              aircraftTypeDetails,
            })),
          ),
        );

        return forkJoin(flightsWithDetails).pipe(
          map((flights) => ({
            data: flights,
            pagination: response.pagination,
          })),
        );
      }),
    );
  }

  getFlightById(id: string): Observable<Flight> {
    return this.makeRequest(`flights/${id}`, {});
  }
}
