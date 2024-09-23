import { Injectable } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { Flight } from './models/flight.model';
import { Observable } from 'rxjs';

@Injectable()
export class FlightsService extends BaseApiService {
  getFlights(params: any): Observable<{ data: Flight[]; pagination: any }> {
    return this.makeRequest('flights', params);
  }

  getFlightById(id: string): Observable<Flight> {
    return this.makeRequest(`flights/${id}`, {});
  }
}
