import React from 'react';

const SideServices: React.FC = () => {
  const services = [
    { title: 'CAR RENTALS', image: '/car-rental.jpg' },
    { title: 'HOTELS', image: '/hotels.jpg' },
    { title: 'TRAVEL PACKAGES', image: '/travel-packages.jpg' },
  ];

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="text-lg font-semibold">{service.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideServices;