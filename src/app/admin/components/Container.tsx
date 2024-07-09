import React from 'react';

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      {children}
    </div>
  );
}

export default Container;
