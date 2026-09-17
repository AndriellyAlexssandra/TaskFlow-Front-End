import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + " " + styles.ativo : styles.link;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Taskflow🚀</h1>
      </div>
      <nav className={styles.nav}>
        {usuario && (
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
        )}
        <NavLink to="/sobre" className={linkClass}>
          Sobre
        </NavLink>
      </nav>
      {/*{usuario && (
        <button className="btn-longout" onClick={logout}>
          Sair
        </button>}}
        */}
      <div className="sidebar-usuario">
        <span>Olá, {usuario?.nome ?? "Usuario"}</span>
        <button className="btn-longout" onClick={handleLogout} >Sair</button>
      </div>
    </aside>
  );
}
export default Sidebar;
