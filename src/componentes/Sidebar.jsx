import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({ aberta, onAlternar }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + " " + styles.ativo : styles.link;

  return (
    <aside className={`${styles.sidebar} ${aberta ? "" : styles.fechada}`}>
      <button
        type="button"
        className={styles.btnToggle}
        onClick={onAlternar}
        title={aberta ? "Recolher menu" : "Abrir menu"}
      >
        {aberta ? "‹" : "›"}
      </button>

      <div className={styles.logo}>
        <h1>Início</h1>
      </div>
      <nav className={styles.nav}>
        {usuario && (
          <NavLink to="/" className={linkClass}>Dashboard</NavLink>
        )}
        <NavLink to="/sobre" className={linkClass}>Sobre</NavLink>
      </nav>

      <div className={styles.rodape}>
        <div className={styles.usuario}>
          <span>Olá, {usuario?.nome ?? "Usuario"}! Seja bem vindo(a)❤️</span>
        </div>
        <button className="btn-longout" onClick={handleLogout}>Sair</button>
      </div>
    </aside>
  );
}
export default Sidebar;
