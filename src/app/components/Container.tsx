import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className='flex flex-col min-h-screen'>
        {children}
    </div>
  )
}

export default Container;
