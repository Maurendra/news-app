import React from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../contexts/AuthContext";
import Provider from "../config/data/Provider";

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [isProcess, setIsProcess] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["hinpl_access_token"]);

  const getAuthState = async () => {
    try {
      const accessToken = cookies.hinpl_access_token;
      if (accessToken) {
        Provider.setToken(accessToken);
        setAuthState(accessToken);
      }
    } catch (err) {
      setAuthState(null);
    }
    setIsProcess(false);
  };

  const setAuth = async (auth) => {
    try {
      Provider.setToken(auth);
      setAuthState(auth);
      setCookie("hinpl_access_token", auth, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  const deleteAuth = async () => {
    try {
      removeCookie("hinpl_access_token", {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      Provider.removeToken();
      setAuthState(null);
    } catch (error) {
      Promise.reject(error);
    }
  };

  React.useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        deleteAuth,
        user,
        setUser,
      }}
    >
      {!isProcess ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
