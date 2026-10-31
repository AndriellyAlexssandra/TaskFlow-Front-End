import styles from "./Header.module.css";

const Header = ({ titulo, subtitulo = "", saudacao = "" }) => (
  <header className={styles.header}>
    <div className={styles.brilho} aria-hidden="true" />
    <div className={styles.conteudo}>
      <h1 className={styles.titulo}>{titulo}</h1>
      {saudacao && <p className={styles.saudacao}>{saudacao}</p>}
      {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
    </div>
  </header>
);

export default Header;