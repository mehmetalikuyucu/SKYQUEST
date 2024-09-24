export interface Flight {
  id: string;
  lastUpdatedAt: string;
  actualLandingTime: string;
  aircraftType: {
    iataMain: string;
    iataSub: string;
  };
  baggageClaim: {
    belts: string[];
  };
  estimatedLandingTime: string;
  expectedTimeOnBelt: string;
  flightDirection: 'A' | 'D';
  flightName: string;
  flightNumber: number;
  isOperationalFlight: boolean;
  mainFlight: string;
  prefixIATA: string;
  prefixICAO: string;
  airlineCode: number;
  publicFlightState: {
    flightStates: string[];
  };
  route: {
    destinations: string[];
    eu: string;
    visa: boolean;
  };
  scheduleDateTime: string;
  scheduleDate: string;
  scheduleTime: string;
  serviceType: string;
  terminal: number;
  schemaVersion: string;
}
