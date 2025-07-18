'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const WhatsAppChat = () => {
  const [hovered, setHovered] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const whatsappNumber = '917305597392'; 
  const message = 'Hello Dravit, I’m reaching out via your website.'; // optional

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const baseUrl = isMobile
      ? 'https://api.whatsapp.com/send'
      : 'https://web.whatsapp.com/send';

    const fullLink = `${baseUrl}?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    setWhatsappLink(fullLink);
  }, []);

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-8 z-[2000000] bg-green-500 hover:bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="transition-transform group-hover:scale-110"
      >
        <path d="M20.52 3.48A11.938 11.938 0 0 0 12 0C5.38 0 .01 5.37.01 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.61a11.933 11.933 0 0 0 5.82 1.49c6.62 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.83 0-3.62-.49-5.2-1.42l-.37-.21-3.68.96.99-3.58-.24-.38C2.57 15.21 2 13.62 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.17-7.16c-.28-.14-1.63-.8-1.88-.89-.25-.09-.43-.14-.61.14-.18.28-.7.89-.86 1.07-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.36-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.6-.46h-.51c-.16 0-.43.06-.66.28s-.86.84-.86 2.04.89 2.37 1.01 2.53c.12.16 1.75 2.68 4.25 3.76.59.26 1.05.41 1.41.52.59.19 1.12.16 1.55.1.47-.07 1.63-.67 1.86-1.3.23-.63.23-1.17.16-1.3-.07-.12-.25-.2-.53-.34z" />
      </svg>

      {/* Tooltip on hover */}
      {hovered && ( 
        <span className="absolute right-16 bottom-10 bg-white text-green-600 border border-green-500 px-4 py-1 text-sm shadow-lg whitespace-nowrap rounded-full ">
          WhatsApp Me
        </span>
      )}
    </Link>
  );
};

export default WhatsAppChat;
