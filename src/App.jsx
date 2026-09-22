import { useState } from "react";
import { Route, Routes } from "react-router";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./componentes/Sidebar";
import RotaPrivada from "./componentes/RotaPrivada";
import Pagina404 from "./pages/Pagina404";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token } = useAuth();
  const [sidebarAberta, setSidebarAberta] = useState(true);

  return (
    <div className="app-layout">
      {token && (
        <Sidebar
          aberta={sidebarAberta}
          onAlternar={() => setSidebarAberta((a) => !a)}
        />
      )}
      <div
        className="app-conteudo"
        style={{ marginLeft: token && sidebarAberta ? "220px" : "0" }}
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
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;