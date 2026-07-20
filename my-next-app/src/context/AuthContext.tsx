// src/context/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    _id: string;
  name: string;
  email: string;
  image: {
    publicId: string;
    url: string;
  };
}

type AuthContextType = {
  user: User | null ;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
console.log('AuthContextType',)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children,}: {children: React.ReactNode;}) {
    const [user, setUser] = useState<User | null>(null);
    console.log('AuthProvider',user)
    useEffect(()=>{
 console.log("Provider user:", user);
    },[user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    console.log('useAuth in AuthContext')
    const context = useContext(AuthContext);
    console.log('context',context)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}