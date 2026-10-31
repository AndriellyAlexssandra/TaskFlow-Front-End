import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useTema } from "../hooks/useTema";

const svgProps = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const IconeDashboard = () => (
  <svg {...svgProps}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);

const IconeInfo = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const IconeTema = () => (
  <svg {...svgProps}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const IconeSair = () => (
  <svg {...svgProps}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

function Sidebar({ aberta, onAlternar }) {
  const { usuario, logout } = useAuth();
  const { tema, alternar } = useTema();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const classeLink = ({ isActive }) =>
    isActive ? `${styles.item} ${styles.ativo}` : styles.item;

  return (
    <aside className={`${styles.sidebar} ${aberta ? "" : styles.fechada}`}>
      <button
        type="button"
        className={styles.btnToggle}
        onClick={onAlternar}
        title={aberta ? "Recolher menu" : "Abrir menu"}
        aria-label={aberta ? "Recolher menu" : "Abrir menu"}
      >
        {aberta ? "‹" : "›"}
      </button>

      <div className={styles.marca}>
        <span className={styles.marcaIcone}>✦</span>
        {aberta && <span>Painel</span>}
      </div>

      <nav className={styles.nav}>
        {usuario && (
          <NavLink to="/" className={classeLink} title="Dashboard">
            <IconeDashboard />
            {aberta && <span>Dashboard</span>}
          </NavLink>
        )}
        <NavLink to="/sobre" className={classeLink} title="Sobre">
          <IconeInfo />
          {aberta && <span>Sobre</span>}
        </NavLink>
      </nav>

      <button
        type="button"
        className={styles.item}
        onClick={alternar}
        title="Trocar tema"
      >
        <IconeTema />
        {aberta && (
          <span>{tema === "dark" ? "Modo claro" : "Modo escuro"}</span>
        )}
      </button>

      <button
        type="button"
        className={`${styles.item} ${styles.sair}`}
        onClick={handleLogout}
        title="Sair"
      >
        <IconeSair />
        {aberta && <span>Sair</span>}
      </button>
    </aside>
  );
}

export default Sidebar;
