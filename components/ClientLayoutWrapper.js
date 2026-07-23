'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
      {!isAdmin && <Header />}
      <main className={`flex-grow flex flex-col w-full max-w-full overflow-x-hidden ${isAdmin ? '' : 'pt-20 sm:pt-24'}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  );
}
