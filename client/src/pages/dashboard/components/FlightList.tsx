import React from 'react';

const FlightList: React.FC = ({}) => {

  return (
    <div>
      {/* {flights.map(flight => (
        <div key={flight.id} className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
          <div>
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-4">{flight.departure}</span>
              <span className="text-gray-500 mr-4">{flight.duration}</span>
              <span className="font-semibold">{flight.arrival}</span>
            </div>
            <div className="text-sm text-gray-500">{flight.airline}</div>
          </div>
          <div>
            <div className="text-xl font-bold mb-2">${flight.price}</div>
            <button className="bg-purple-700 text-white px-4 py-2 rounded">Book Flight</button>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default FlightList;