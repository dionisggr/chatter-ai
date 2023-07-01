// TemperatureSlider.js
import React from 'react';

const Slider = ({ label, min, max, step, value, setValue }) => (
  <div className="px-4 py-2">
    <label className="block text-sm text-gray-700">{label}: {value}</label>
    <input 
      type="range" 
      min={min}
      max={max} 
      step={step} 
      value={value} 
      onChange={e => setValue(parseFloat(e.target.value))} 
      className="slider mt-2" 
    />
  </div>
);

export default Slider;
