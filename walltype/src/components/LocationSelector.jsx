import React from 'react';

const presetCities = {
  'New Delhi': { latitude: 28.6139, longitude: 77.2090 },
  'San Francisco': { latitude: 37.7749, longitude: -122.4194 },
  'Tokyo': { latitude: 35.6895, longitude: 139.6917 },
  'London': { latitude: 51.5072, longitude: -0.1276 },
  'Sydney': { latitude: -33.8688, longitude: 151.2093 },
};

export default function LocationSelector({ onLocationChange }) {
  return (
    <div className="absolute top-4 left-4 bg-white/80 p-4 rounded shadow-md">
      <h2 className="font-bold mb-2">Choose a City</h2>
      <select
        className="p-2 rounded border"
        onChange={(e) => {
          const city = e.target.value;
          if (city && presetCities[city]) {
            onLocationChange(presetCities[city]);
          }
        }}
      >
        <option value="">-- Select a City --</option>
        {Object.keys(presetCities).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}
