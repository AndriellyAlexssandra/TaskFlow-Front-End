import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RotaPrivada({ children }) {
  const { logado } = useAuth();
  if (!logado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default RotaPrivada;
