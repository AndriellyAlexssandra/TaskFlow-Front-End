import { Route, Routes } from "react-router";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./componentes/Sidebar";
import RotaPrivada from "./componentes/RotaPrivada";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token } = useAuth();
  return (
    <div className="app-layout">
      {token && <Sidebar />}
      <main
        className="app-conteudo"
        style={{ marginLeft: token ? "220px" : "0" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <RotaPrivada>
                <Dashboard />
              </RotaPrivada>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<h1>Página não encontrada :( </h1>} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
