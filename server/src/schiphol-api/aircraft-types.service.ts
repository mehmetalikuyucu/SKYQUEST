import { Injectable } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { AircraftType } from './models/aircraft-type.model';
import { Observable, map } from 'rxjs';

@Injectable()
export class AircraftTypesService extends BaseApiService {
  getAircraftTypes(
    params: any,
  ): Observable<{ data: AircraftType[]; pagination: any }> {
    return this.makeRequest('aircrafttypes', params);
  }

  getAircraftTypeByIata(
    iataMain: string,
    iataSub: string,
  ): Observable<AircraftType> {
    return this.makeRequest('aircrafttypes', { iataMain, iataSub }).pipe(
      map((response) => response.data.aircraftTypes[0]),
    );
  }
}
