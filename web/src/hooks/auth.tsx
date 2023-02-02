import React, { createContext, useState, useContext, ReactNode } from 'react';
import { JwtModel } from '../models/Jwt';
import jwt_decode from "jwt-decode";
import { SingIn } from '../services/user';
import { toast } from 'react-toastify';

interface IAuthContext {
  jwt?: JwtModel | undefined;
  signIn(email: string, password: string): void;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [jwt, setJwt] = useState<JwtModel | undefined>(() => {
    const token = localStorage.getItem('@carwash:key');

    if (token) {
      const decoded: JwtModel = jwt_decode(localStorage.getItem('@carwash:key') as any);
      return decoded;
    }

    return undefined;
  });

  const signIn = async (email: string, password: string) => {
    try {
      const result = await SingIn({
        email: email,
        password: password
      })


      if (result.tokens.access != null) {
        localStorage.setItem('@carwash:key', String(result.tokens.access));
        const decoded: JwtModel = jwt_decode(localStorage.getItem('@carwash:key') as any);
        setJwt(decoded)
      } else {
        throw 'Error when try login';
      }

    } catch (error) {
      toast.error('Failed to login')
    }

  }

  const signOut = () => {
    localStorage.removeItem('@carwash:key');
    setJwt(undefined);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, jwt }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };