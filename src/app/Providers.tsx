// components/AuthProvider.tsx
"use client"; // บอกให้ Next.js รู้ว่า component นี้ควรทำงานเฉพาะบน client-side เท่านั้น

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
