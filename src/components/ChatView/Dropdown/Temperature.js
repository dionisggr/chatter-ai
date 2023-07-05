import React from 'react';

const Temperature = ({ temperature, setTemperature }) => (
  <div className="px-4 py-2">
    <label className="block text-sm text-gray-700">Temperature: {temperature}</label>
    <input 
      type="range" 
      min="0" 
      max="1" 
      step="0.1" 
      value={temperature} 
      onChange={e => setTemperature(e.target.value)} 
      className="slider mt-2" 
    />
  </div>
);

export default Temperature;
