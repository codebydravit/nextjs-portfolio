
'use client';

import { useState } from 'react';
import Link from 'next/link';

const CallChat = () => {
  const [hovered, setHovered] = useState(false);

  const call_number = 'tel:917305597392'; // change to your number

  const call_link = `${call_number}`;

  return (
    <Link
      href={call_link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-8 z-[2000000] bg-green-500 hover:bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    {/* Telephone Call SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="transition-transform group-hover:scale-110"
    >
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.05 11.05 0 0 0 3.47.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.39 21 3 14.61 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.19.19 2.35.55 3.47a1 1 0 0 1-.24 1.05l-2.2 2.2z" />
    </svg>


      {/* Tooltip on hover */}
      {hovered && (  
        <span className="absolute left-16 bottom-10 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1 text-sm  shadow-md whitespace-nowrap rounded-full">
        Call Me
      </span>
      )}
    </Link>
  );
};

export default CallChat;
