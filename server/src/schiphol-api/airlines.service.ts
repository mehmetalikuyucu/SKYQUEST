import { Injectable } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { Airline } from './models/airline.model';
import { Observable } from 'rxjs';

@Injectable()
export class AirlinesService extends BaseApiService {
  getAirlines(params: any): Observable<{ data: Airline[]; pagination: any }> {
    return this.makeRequest('airlines', params);
  }

  getAirlineByCode(code: string): Observable<Airline> {
    return this.makeRequest(`airlines/${code}`, {});
  }
}
