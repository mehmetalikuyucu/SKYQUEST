import React from 'react';

const FlightSearchForm: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex mb-4">
        <button className="bg-purple-700 text-white px-4 py-2 rounded-l">Round trip</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r">One way</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <input type="text" placeholder="From" className="p-2 border rounded" />
        <input type="text" placeholder="To" className="p-2 border rounded" />
        <input type="date" className="p-2 border rounded" />
        <input type="date" className="p-2 border rounded" />
      </div>
      <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded">Show flights</button>
    </div>
  );
};

export default FlightSearchForm;