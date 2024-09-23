export interface Flight {
  id: string;
  flightName: string;
  flightNumber: number;
  scheduleDateTime: string;
  flightDirection: 'A' | 'D';
  route: {
    destinations: string[];
    eu: string;
    visa: boolean;
  };
  prefixIATA: string;
  prefixICAO: string;
  airlineCode: number;
}
