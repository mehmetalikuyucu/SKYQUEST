import { Injectable } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { AircraftType } from './models/aircraft-type.model';
import { Observable } from 'rxjs';

@Injectable()
export class AircraftTypesService extends BaseApiService {
  getAircraftTypes(
    params: any,
  ): Observable<{ data: AircraftType[]; pagination: any }> {
    return this.makeRequest('aircrafttypes', params);
  }
}
