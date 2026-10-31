import styles from "./TarefaItem.module.css";
import lixeiraVermelha from "../assets/lixeira-vermelha.png";
import lixeiraLaranja from "../assets/lixeira-laranja.png";
import lixeiraVerde from "../assets/lixeira-verde.png";

const lixeirasPorPrioridade = {
  alta: lixeiraVermelha,
  media: lixeiraLaranja,
  baixa: lixeiraVerde,
};

function IconeEditar() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function TarefaItem({
  id,
  texto,
  prioridade = "media",
  rotuloPrioridade = "",
  concluido = false,
  corPrioridade = null,
  usuario = null,
  projeto = null,
  onDeletar,
  onEditar,
  onMover = null,
  colunaAnterior = null,
  colunaProxima = null,
}) {
  const classeItem = [styles.tarefa, styles[prioridade], concluido && styles.concluido]
    .filter(Boolean)
    .join(" ");

  const classeTexto = [styles.textoTarefa, concluido && styles.textoConcluido]
    .filter(Boolean)
    .join(" ");

  const classePrioridade = [styles["badge-prioridade"], styles["badge-" + prioridade]]
    .filter(Boolean)
    .join(" ");

  const estiloCor = corPrioridade
    ? { "--cor-prioridade": corPrioridade }
    : undefined;

  return (
    <li
      className={classeItem}
      style={estiloCor}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", String(id));
        event.dataTransfer.effectAllowed = "move";
      }}
    >
      <div className={styles.linhaPrincipal}>
        <span className={classeTexto} onDoubleClick={onEditar}>
          {texto}
        </span>

        {(colunaAnterior || colunaProxima) && (
          <div className={styles.acoes}>
            {colunaAnterior && (
              <button
                type="button"
                className={`${styles.btnMover} ${styles.btnVoltar}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onMover && onMover(colunaAnterior);
                }}
                title={`Mover para ${colunaAnterior}`}
                aria-label={`Mover para ${colunaAnterior}`}
              >
                ←
              </button>
            )}
            {colunaProxima && (
              <button
                type="button"
                className={`${styles.btnMover} ${styles.btnAvancar}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onMover && onMover(colunaProxima);
                }}
                title={`Mover para ${colunaProxima}`}
                aria-label={`Mover para ${colunaProxima}`}
              >
                →
              </button>
            )}
          </div>
        )}
      </div>

      {(usuario || projeto) && (
        <div className={styles.info}>
          {usuario && (
            <div className={styles.infoItem}>
              <span className={styles.infoRotulo}>Responsável</span>
              <span className={styles.infoValor}>{usuario}</span>
            </div>
          )}
          {projeto && (
            <div className={styles.infoItem}>
              <span className={styles.infoRotulo}>Projeto</span>
              <span className={styles.infoValor}>{projeto}</span>
            </div>
          )}
        </div>
      )}

      <div className={styles.linhaSegundaria}>
        <span className={classePrioridade}>
          {rotuloPrioridade || prioridade}
        </span>

        <div className={styles.acoesRodape}>
          {onEditar && (
            <button
              type="button"
              className={styles.btnEditar}
              onClick={(event) => {
                event.stopPropagation();
                onEditar();
              }}
              title="Editar tarefa"
              aria-label="Editar tarefa"
            >
              <IconeEditar />
            </button>
          )}

          <button
            type="button"
            className={styles.btnDeletar}
            onClick={(event) => {
              event.stopPropagation();
              onDeletar();
            }}
            aria-label="Deletar tarefa"
          >
            <img
              src={lixeirasPorPrioridade[prioridade]}
              alt=""
              className={styles.iconeLixeira}
            />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TarefaItem;