import React from 'react';

export const PricingDashboard = () => {
  // Generate random blurred rectangles to simulate text
  const generateBlurredText = (width, count = 1) => {
    return Array(count).fill(0).map((_, i) => (
      <div 
        key={i}
        className="bg-gray-300 rounded blur-[2px]" 
        style={{ 
          width: typeof width === 'number' ? `${width}%` : width,
          height: '0.8rem',
          marginBottom: count > 1 && i < count - 1 ? '0.3rem' : 0
        }}
      ></div>
    ));
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Header with blurred title */}
      <div className="p-4 bg-indigo-600 text-white relative overflow-hidden">
        <div className="relative z-10">
          {generateBlurredText(60)}
          <div className="h-2"></div>
          {generateBlurredText(40)}
        </div>
        {/* Abstract overlay pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          {Array(10).fill(0).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white" 
              style={{ 
                width: Math.random() * 50 + 10,
                height: Math.random() * 50 + 10,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Filter section with blurred buttons */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-3">
          {[40, 35, 32, 30].map((width, i) => (
            <div key={i} className="bg-white px-3 py-2 rounded border border-gray-300 blur-[1px]">
              {generateBlurredText(width)}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* Chart area with abstract visualization */}
        <div className="col-span-8 bg-gray-50 rounded-lg p-3 h-64 flex flex-col">
          <div className="blur-[1px]">{generateBlurredText(30)}</div>
          <div className="flex-grow relative mt-2">
            {/* Abstract data visualization */}
            <div className="absolute bottom-0 left-0 right-0 flex h-full items-end justify-around px-2">
              {Array(16).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="w-full mx-0.5 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t"
                  style={{ height: `${Math.random() * 80 + 10}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between blur-[2px] mt-2">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-300 w-4 h-3 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Stats cards with blurred data */}
        <div className="col-span-4 grid grid-rows-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <div className="blur-[2px]">{generateBlurredText(40)}</div>
              <div className="h-2"></div>
              <div className="blur-[1px]">{generateBlurredText(50)}</div>
              <div className="h-2"></div>
              <div className="blur-[2px]">{generateBlurredText(60)}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Data table with completely blurred content */}
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {[15, 20, 15, 20, 10].map((width, i) => (
                <th key={i} className="p-2 border-b">
                  <div className="blur-[2px] mx-auto">{generateBlurredText(width)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100">
                {[1, 2, 3, 4, 5].map((colIndex) => (
                  <td key={colIndex} className="p-2">
                    <div className="blur-[2px] mx-auto">
                      {generateBlurredText(colIndex === 1 ? 30 : colIndex === 2 ? 40 : 20)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingDashboard;