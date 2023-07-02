import React from 'react';

const Slider = ({ label, min, max, step, value, setValue }) => (
  <div className="px-4 py-2">
    <div className="flex items-center justify-between mb-2">
      <label className="text-sm text-gray-700">{label}</label>
      <input 
        type="number" 
        min={min}
        max={max} 
        step={step} 
        value={value} 
        onChange={e => setValue(parseFloat(e.target.value))}
        className="w-fit text-right hover:border m-[1px] rounded px-1 hover:m-0 bg-transparent outline-none"
      />
    </div>
    <input 
      type="range" 
      min={min}
      max={max} 
      step={step} 
      value={value} 
      onChange={e => setValue(parseFloat(e.target.value))}
      className="slider w-full" 
    />
  </div>
);

export default Slider;
