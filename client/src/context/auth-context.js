import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const cookies = parseCookies();

  const returnToken = () => {
    return cookies.token;
  };

  const userAuth = () => {
    if (!cookies.token) {
      router.push("/signIn");
    }
  };

  const data = {
    returnToken,
    userAuth,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const authUser = () => useContext(AuthContext);

export default AuthProvider;
