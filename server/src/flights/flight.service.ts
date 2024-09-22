import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class FlightService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = 'https://api.schiphol.nl/public-flights';
  }

  private getHeaders() {
    return {
      Accept: 'application/json',
      ResourceVersion: 'v4',
      app_id: this.configService.get<string>('SCHIPHOL_APP_ID'),
      app_key: this.configService.get<string>('SCHIPHOL_APP_KEY'),
    };
  }

  getFlights(params: any): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/flights`, { headers: this.getHeaders(), params })
      .pipe(
        map((response) => ({
          flights: response.data.flights,
          pagination: this.extractPaginationInfo(response.headers['link']),
        })),
        catchError(this.handleError)
      );
  }

  getFlightById(id: string): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/flights/${id}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  getAirlines(params: any): Observable<any> {
    console.log("asdasdasd");
    return this.httpService
      .get(`${this.apiUrl}/airlines`, { headers: this.getHeaders(), params })
      .pipe(
        map((response) => {
          console.log(response.data);
          return {
            airlines: response.data.airlines,
            pagination: this.extractPaginationInfo(response.headers['link']),
          };
        }),
        catchError(this.handleError)
      );
  }

  getAirlineByCode(code: string): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/airlines/${code}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  getAircraftTypes(params: any): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/aircrafttypes`, { headers: this.getHeaders(), params })
      .pipe(
        map((response) => ({
          aircraftTypes: response.data.aircraftTypes,
          pagination: this.extractPaginationInfo(response.headers['link']),
        })),
        catchError(this.handleError)
      );
  }

  getDestinations(params: any): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/destinations`, { headers: this.getHeaders(), params })
      .pipe(
        map((response) => ({
          destinations: response.data.destinations,
          pagination: this.extractPaginationInfo(response.headers['link']),
        })),
        catchError(this.handleError)
      );
  }

  getDestinationByIata(iata: string): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/destinations/${iata}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  private extractPaginationInfo(linkHeader: string): any {
    const links = {};
    if (linkHeader) {
      const parts = linkHeader.split(',');
      parts.forEach(part => {
        const section = part.split(';');
        if (section.length != 2) {
          return;
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
      });
    }
    return links;
  }

  private handleError(error: any): Observable<never> {
    return throwError(
      new HttpException(
        'An error occurred while fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    );
  }
}