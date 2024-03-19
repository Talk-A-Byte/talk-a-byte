import { useState, createContext } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn == false) {
    let token = SecureStore.getItem("token");
    if (token) setIsLoggedIn(true);
  }
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
