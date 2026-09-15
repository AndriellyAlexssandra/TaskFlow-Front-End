import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { token, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + " " + styles.ativo : styles.link;
 //marginLeft: token ? '220px' : '0'
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Taskflow🚀</h1>
      </div>
      <nav className={styles.nav}>
        {token && (
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
        )}
        <NavLink to="/sobre" className={linkClass}>
          Sobre
        </NavLink>
      </nav>
      {token && (
        <button className="btn-longout" onClick={logout}>
          Sair
        </button>
      )}
     
    </aside>
  );
}
export default Sidebar;
