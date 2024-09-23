import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api-client/apiClient";

interface Flight {
  id: string;
  flightName: string;
  flightNumber: number;
  scheduleDateTime: string;
  flightDirection: string;
  route: {
    destinations: string[];
  };
  publicFlightState: {
    flightStates: string[];
  };
  aircraftType: {
    iataMain: string;
  };
  terminal: number;
}

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [direction, setDirection] = useState<"A" | "D" | "">("");

  const {
    data: flights,
    isLoading,
    error,
  } = useQuery<Flight[]>({
    queryKey: ["flights"],
    queryFn: () =>
      apiClient.get("/flights").then((res) => res.data.data.flights),
  });

  const filteredFlights = flights?.filter(
    (flight) =>
      (filter === "" ||
        flight.flightName.toLowerCase().includes(filter.toLowerCase()) ||
        flight.route.destinations[0]
          .toLowerCase()
          .includes(filter.toLowerCase())) &&
      (direction === "" || flight.flightDirection === direction)
  );

  if (isLoading)
    return <div className="text-center mt-8">Uçuşlar yükleniyor...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        Bir hata oluştu: {(error as Error).message}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Uçuş Listesi</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Uçuş veya varış yeri ara"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as "A" | "D" | "")}
          className="px-3 py-2 border rounded"
        >
          <option value="">Tüm Yönler</option>
          <option value="A">Geliş</option>
          <option value="D">Gidiş</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Uçuş</th>
            <th className="border p-2">Varış Yeri</th>
            <th className="border p-2">Tarih/Saat</th>
            <th className="border p-2">Durum</th>
            <th className="border p-2">Uçak Tipi</th>
            <th className="border p-2">Terminal</th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights?.map((flight) => (
            <tr key={flight.id} className="hover:bg-gray-100">
              <td className="border p-2">{flight.flightName}</td>
              <td className="border p-2">{flight.route.destinations[0]}</td>
              <td className="border p-2">
                {new Date(flight.scheduleDateTime).toLocaleString()}
              </td>
              <td className="border p-2">
                {flight.publicFlightState.flightStates.join(", ")}
              </td>
              <td className="border p-2">{flight.aircraftType.iataMain}</td>
              <td className="border p-2">{flight.terminal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
