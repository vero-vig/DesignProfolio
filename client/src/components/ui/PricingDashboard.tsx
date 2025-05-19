import React from 'react';

export const PricingDashboard = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <div className="p-4 bg-indigo-600 text-white">
        <h3 className="text-lg font-semibold">Price Analysis Dashboard</h3>
        <p className="text-sm opacity-80">Sample visualization with anonymized data</p>
      </div>
      
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-3">
          <div className="bg-white px-3 py-2 rounded border border-gray-300 text-sm">
            Product Category ▾
          </div>
          <div className="bg-white px-3 py-2 rounded border border-gray-300 text-sm">
            Price Range ▾
          </div>
          <div className="bg-white px-3 py-2 rounded border border-gray-300 text-sm">
            Date Range ▾
          </div>
          <div className="bg-white px-3 py-2 rounded border border-indigo-300 text-sm text-indigo-600">
            Apply Filters
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* Chart area */}
        <div className="col-span-8 bg-gray-50 rounded-lg p-3 h-64 flex flex-col">
          <div className="text-sm font-medium mb-2">Price Trends</div>
          <div className="flex-grow relative">
            {/* Simplified bar chart */}
            <div className="absolute bottom-0 left-0 right-0 flex h-full items-end justify-around px-2">
              {[65, 40, 80, 75, 30, 55, 70, 50, 85, 45, 60, 90].map((height, i) => (
                <div 
                  key={i} 
                  className="w-full mx-0.5 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="col-span-4 grid grid-rows-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Average Price</div>
            <div className="text-2xl font-bold text-indigo-700">$XX.XX</div>
            <div className="text-xs text-green-600">+X.X% vs last period</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Price Range</div>
            <div className="text-2xl font-bold text-indigo-700">$XX - $XX</div>
            <div className="text-xs text-gray-600">Across all products</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500">Total Products</div>
            <div className="text-2xl font-bold text-indigo-700">XXX</div>
            <div className="text-xs text-red-600">-X.X% vs last period</div>
          </div>
        </div>
      </div>
      
      {/* Data table */}
      <div className="p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 border-b font-medium">Product ID</th>
              <th className="text-left p-2 border-b font-medium">Category</th>
              <th className="text-right p-2 border-b font-medium">Current Price</th>
              <th className="text-right p-2 border-b font-medium">Previous Price</th>
              <th className="text-right p-2 border-b font-medium">Change</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-2 text-gray-700">PROD-XXXX</td>
                <td className="p-2 text-gray-700">Category X</td>
                <td className="p-2 text-right text-gray-700">$XX.XX</td>
                <td className="p-2 text-right text-gray-700">$XX.XX</td>
                <td className="p-2 text-right text-green-600">+X.X%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingDashboard;