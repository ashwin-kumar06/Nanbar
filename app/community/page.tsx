// app/community/page.tsx

import React from 'react';

export default function CommunityPage() {
  return (
    <div className="p-8 text-gray-900">
      <h1 className="text-3xl font-semibold mb-4">DIY Community</h1>
      <p className="mb-4">See how others have solved their household issues. Share your own solutions and learn from the best!</p>

      <ul className="space-y-4">
        <li className="border p-4 rounded-md">
          <h3 className="font-bold text-xl">🛠 Fixed a Jammed Door</h3>
          <p className="text-gray-700">I used a graphite powder and aligned the hinges. Took 15 minutes!</p>
        </li>
        <li className="border p-4 rounded-md">
          <h3 className="font-bold text-xl">💡 Replaced a Flickering Bulb</h3>
          <p className="text-gray-700">Found out the socket was loose. Tightened it and it worked.</p>
        </li>
        <li className="border p-4 rounded-md">
          <h3 className="font-bold text-xl">🚰 Fixed Leaking Tap</h3>
          <p className="text-gray-700">Was a worn-out washer. Replaced it for ₹20. Saved a lot!</p>
        </li>
      </ul>
    </div>
  );
}
