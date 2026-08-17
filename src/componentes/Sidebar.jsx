import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { logado, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + " " + styles.ativo : styles.link;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Taskflow🚀</h1>
      </div>
      <nav className={styles.nav}>
        {logado && (
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
        )}
        <NavLink to="/sobre" className={linkClass}>
          Sobre
        </NavLink>
      </nav>
      {logado && (
        <button className="btn-longout" onClick={logout}>
          Sair
        </button>
      )}
    </aside>
  );
}
export default Sidebar;
