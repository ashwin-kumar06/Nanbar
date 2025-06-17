// app/store/page.tsx

import React from 'react';

export default function StorePage() {
  const tools = [
    { name: 'Plumbing Starter Kit', price: '₹499' },
    { name: 'Mini Screwdriver Set', price: '₹299' },
    { name: 'Electrical Tape Roll', price: '₹99' },
    { name: 'Basic Wall Drill', price: '₹1,499' },
  ];

  return (
    <div className="p-8 text-gray-900">
      <h1 className="text-3xl font-semibold mb-4">DIY Tools Store</h1>
      <p className="mb-6">Purchase essential tools for home repairs and maintenance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <div key={index} className="border p-4 rounded-md shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-bold">{tool.name}</h2>
            <p className="text-green-600 font-medium">{tool.price}</p>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
