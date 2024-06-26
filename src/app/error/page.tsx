import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-2xl mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default ErrorPage;