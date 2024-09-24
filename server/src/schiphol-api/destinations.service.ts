import { Injectable, Logger } from '@nestjs/common';
import { BaseApiService } from './base-api.service';
import { Destination } from './models/destination.model';
import { Observable, from, mergeMap, toArray, map, expand, EMPTY } from 'rxjs';

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

  getAllDestinations(): Observable<Destination[]> {
    return this.fetchAllPages().pipe(
      mergeMap((responses) => responses),
      map((response) => response.data.destinations),
      toArray(),
      map((destinationsArrays) => destinationsArrays.flat()),
    );
  }

  private fetchAllPages(initialPage = 0): Observable<any[]> {
    return this.getDestinations({ page: initialPage }).pipe(
      expand((response) => {
        const nextPage = this.getNextPageNumber(response.pagination.next);
        if (nextPage !== null) {
          return this.getDestinations({ page: nextPage });
        } else {
          return EMPTY;
        }
      }),
      toArray(),
    );
  }

  private getNextPageNumber(nextUrl: string | null): number | null {
    if (!nextUrl) return null;
    const url = new URL(nextUrl);
    const page = url.searchParams.get('page');
    return page ? parseInt(page, 10) : null;
  }
}
