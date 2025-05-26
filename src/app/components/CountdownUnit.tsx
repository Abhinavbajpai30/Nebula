import React from 'react';
import "../styles/app.css"

interface CountdownUnitProps {
  value: number;
  unit: string;
  showSeparator: boolean;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, unit, showSeparator }) => (
  <>
    <div className="flex flex-col items-center mx-1 sm:mx-2">
      <div className="relative bg-black bg-opacity-60 p-3 sm:p-4 rounded-lg shadow-2xl border border-gray-600/50 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 flex items-center justify-center">
        <span className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 tabular-nums tracking-wider">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute inset-0 rounded-lg border border-gray-400/40 animate-pulse opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>
      <span className="mt-2 text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wider">{unit}</span>
    </div>
    {showSeparator && (
      <div className="flex items-center h-20 sm:h-24 md:h-28 px-1 sm:px-2">
        <span className="font-orbitron text-3xl sm:text-4xl md:text-5xl text-gray-500 opacity-80">:</span>
      </div>
    )}
  </>
);

export default CountdownUnit;