import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // ✅ Import Script from Next.js
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dravit V | AI Engineer & Full-Stack Developer',
  description: 'AI Engineer with strong full-stack development and deployment skills, experienced in building GenAI apps, chatbots, and scalable APIs using FastAPI, LangChain, React, and Azure.',
  keywords: 'AI Engineer, Full Stack Developer, GenAI Apps, LangChain, FastAPI, React, Azure, Chatbots, Scalable APIs',
  openGraph: {
    title: 'Dravit V | AI Engineer & Full-Stack Developer',
    description: 'AI Engineer with strong full-stack development and deployment skills, building GenAI apps and scalable APIs',
    type: 'website',
    url: 'https://www.dravit.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dravit V | AI Engineer & Full-Stack Developer',
    description: 'AI Engineer with strong full-stack development and deployment skills, building GenAI apps and scalable APIs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        {/* ✅ Google Analytics Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FM6BERDKFD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FM6BERDKFD');
          `}
        </Script>

        {children}
        <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
