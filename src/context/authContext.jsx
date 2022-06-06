import React from "react";

export const authContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
