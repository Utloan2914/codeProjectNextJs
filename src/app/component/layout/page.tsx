// layout.tsx
'use client';
import React, { Suspense, ReactNode } from 'react';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
import ErrorPage from '../../error/page';
import Product from '../../productAPI/page'; 
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const showContent = pathname === '/register' || pathname === '/login' || pathname === '/' || pathname === '/productAPI' || pathname === '/logout';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <main className="flex flex-col items-center justify-center">
            {showContent ? (
              pathname === '/productAPI' ? (
                <Product /> 
              ) : (
                children 
              )
            ) : (
              <ErrorPage />
            )}
          </main>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
