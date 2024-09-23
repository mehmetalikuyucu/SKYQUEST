import { Injectable } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { Destination } from './models/destination.model';
import { Observable } from 'rxjs';

@Injectable()
export class DestinationsService extends BaseApiService {
  getDestinations(
    params: any,
  ): Observable<{ data: Destination[]; pagination: any }> {
    return this.makeRequest('destinations', params);
  }

  getDestinationByIata(iata: string): Observable<Destination> {
    return this.makeRequest(`destinations/${iata}`, {});
  }
}
