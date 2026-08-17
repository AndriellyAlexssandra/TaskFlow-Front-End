import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);

  function login() {
    setLogado(true);
  }
  function logout() {
    setLogado(false);
  }
  return (
    <AuthContext.Provider value={{ logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro do Auth Provider.");
  }
  return context;
}
