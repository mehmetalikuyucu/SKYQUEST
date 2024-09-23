import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, map, catchError } from 'rxjs';

@Injectable()
export class BaseApiService {
  protected readonly logger = new Logger(this.constructor.name);
  protected readonly apiUrl: string;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    this.apiUrl = 'https://api.schiphol.nl/public-flights';
  }

  protected getHeaders() {
    return {
      Accept: 'application/json',
      ResourceVersion: 'v4',
      app_id: this.configService.get<string>('SCHIPHOL_APP_ID'),
      app_key: this.configService.get<string>('SCHIPHOL_APP_KEY'),
    };
  }

  protected makeRequest(endpoint: string, params: any): Observable<any> {
    this.logger.debug(
      `Making request to ${endpoint} with params: ${JSON.stringify(params)}`,
    );
    return this.httpService
      .get(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders(), params })
      .pipe(
        map((response) => {
          this.logger.debug(
            `Response from ${endpoint}: ${JSON.stringify(response.data)}`,
          );
          return {
            data: response.data,
            pagination: this.extractPaginationInfo(response.headers['link']),
          };
        }),
        catchError((error) => {
          this.logger.error(
            `Error in ${endpoint}: ${JSON.stringify(error.response?.data || error.message)}`,
          );
          throw new HttpException(
            `An error occurred while fetching ${endpoint} data: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );
  }

  protected extractPaginationInfo(linkHeader: string): any {
    const links = {};
    if (linkHeader) {
      const parts = linkHeader.split(',');
      parts.forEach((part) => {
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
}
