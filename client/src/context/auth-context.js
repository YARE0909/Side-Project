import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const cookies = parseCookies();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(cookies.token);
  }, []);

  const userAuth = () => {
    if (!cookies.token) {
      router.push("/signIn");
    } else {
      return true;
    }
  };

  const data = {
    token,
    userAuth,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const authUser = () => useContext(AuthContext);

export default AuthProvider;
