import styles from "./Header.module.css";

const Header = ({ titulo, subtitulo = "Informe o subtítulo" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>{titulo}</h1>
          <p>{subtitulo}</p>
        </div>
      </div>
      <svg
        className={styles.onda}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 C240,120 480,0 720,48 C960,96 1200,120 1440,40 L1440,120 L0,120 Z"
          fill="#0a0e17"
        />
      </svg>
    </header>
  );
};

export default Header;