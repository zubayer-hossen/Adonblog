import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);

      setUser({ id: decoded.id, role: decoded.role });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role });
    navigate("/admin");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
