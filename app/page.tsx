// app/page.tsx

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Welcome to DIY Assistant</h1>
      <p className="text-lg mb-6">
        Your smart helper for fixing everyday household problems—leaking taps, jammed doors, flickering bulbs, and more.
      </p>

      <div className="space-y-2">
        <Link href="/appointment" className="text-blue-600 underline hover:text-blue-800">
          Book a DIY Assistant
        </Link><br />
        <Link href="/community" className="text-blue-600 underline hover:text-blue-800">
          Visit Community Page
        </Link><br />
        <Link href="/store" className="text-blue-600 underline hover:text-blue-800">
          Go to DIY Tools Store
        </Link>
      </div>
    </div>
  );
}
