// app/appointment/page.tsx

import React from 'react';

export default function AppointmentPage() {
  return (
    <div className="p-8 text-gray-900">
      <h1 className="text-3xl font-semibold mb-4">Book an Appointment</h1>
      <p className="mb-6">Fill in your issue and environment details. Our AI will assist you or schedule a callback.</p>

      <form className="space-y-4 max-w-lg">
        <div>
          <label className="block font-medium">Your Name</label>
          <input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block font-medium">Issue</label>
          <input type="text" placeholder="e.g., Leaking Tap" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block font-medium">Environment</label>
          <select className="w-full px-4 py-2 border rounded-md">
            <option>Kitchen</option>
            <option>Bathroom</option>
            <option>Bedroom</option>
            <option>Living Room</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
