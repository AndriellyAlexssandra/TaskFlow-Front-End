import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
 const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [usuario, setUsuario] = useState(() =>{
  const salvo = localStorage.getItem("usuario");
  return salvo ? JSON.parse(salvo) : null;
  });

  function login(dadosUsuario, tokenRecebido) {
    setUsuario(dadosUsuario);
    setToken(tokenRecebido);
    localStorage.setItem("token", tokenRecebido);
    localStorage.setItem("token", tokenRecebido);
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
  }
  function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
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
