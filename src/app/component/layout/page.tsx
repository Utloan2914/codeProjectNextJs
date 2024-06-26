'use client'
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

  if (pathname === '/register' || pathname === '/login' || pathname === '/' || pathname === '/productAPI'|| pathname ==='/logout' ) {
    return (
      <div>
      
          <Navbar />
        <Suspense fallback={<div className="flex justify-center items-center h-screen">
        </div>}>
          <main>
            {pathname === '/productAPI' ? (
              <Product /> 
            ) : (
              children 
            )}
          </main>
        </Suspense>
        <Footer />
      </div>
    );
  } else {
    return <ErrorPage />;
  }
};

export default Layout;
