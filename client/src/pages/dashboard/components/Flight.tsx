import React from 'react';

interface FlightProps {
  flight: {
    lastUpdatedAt: string;
    actualLandingTime: string;
    aircraftType: {
      iataMain: string;
      iataSub: string;
    };
    baggageClaim: {
      belts: string[];
    };
    codeshares: {
      codeshares: string[];
    };
    estimatedLandingTime: string;
    expectedTimeOnBelt: string;
    flightDirection: string;
    flightName: string;
    flightNumber: number;
    id: string;
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
  };
}

const Flight: React.FC<FlightProps> = ({ flight }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{flight.flightName}</h2>
        <span className={`px-2 py-1 rounded text-sm ${flight.flightDirection === 'A' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
          {flight.flightDirection === 'A' ? 'Arrival' : 'Departure'}
        </span>
      </div>
      <p className="text-gray-600 mb-2">Destination: {flight.route.destinations.join(', ')}</p>
      <p className="text-gray-600 mb-2">Scheduled: {new Date(flight.scheduleDateTime).toLocaleString()}</p>
      <p className="text-gray-600 mb-2">Status: {flight.publicFlightState.flightStates.join(', ')}</p>
      <p className="text-gray-600 mb-2">Aircraft: {flight.aircraftType.iataMain} / {flight.aircraftType.iataSub}</p>
      <p className="text-gray-600 mb-2">Terminal: {flight.terminal}</p>
      {flight.flightDirection === 'A' && flight.baggageClaim.belts.length > 0 && (
        <p className="text-gray-600">Baggage Claim: {flight.baggageClaim.belts.join(', ')}</p>
      )}
    </div>
  );
};

export default React.memo(Flight);