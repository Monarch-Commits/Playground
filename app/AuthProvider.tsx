'use client';
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';
interface Children {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: Children) => {
  return <KindeProvider>{children}</KindeProvider>;
};
