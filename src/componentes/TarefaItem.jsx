import styles from "./TarefaItem.module.css";
import lixeiraVermelha from "../assets/lixeira-vermelha.png";
import lixeiraLaranja from "../assets/lixeira-laranja.png";
import lixeiraVerde from "../assets/lixeira-verde.png";

const lixeirasPorPrioridade = {
  alta: lixeiraVermelha,
  media: lixeiraLaranja,
  baixa: lixeiraVerde,
};

function TarefaItem({
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
    <li className={classeItem} style={estiloCor}>
      <div className={styles.linhaPrincipal}>
        <span className={classeTexto} onDoubleClick={onEditar}>
          {texto}
        </span>

        {(colunaAnterior || colunaProxima) && (
          <div className={styles.acoes}>
            {colunaAnterior && (
              <button
                type="button"
                className={styles.btnMover}
                onClick={(event) => {
                  event.stopPropagation();
                  onMover && onMover(colunaAnterior);
                }}
                title={`Mover para ${colunaAnterior}`}
              >
                ←
              </button>
            )}
            {colunaProxima && (
              <button
                type="button"
                className={styles.btnMover}
                onClick={(event) => {
                  event.stopPropagation();
                  onMover && onMover(colunaProxima);
                }}
                title={`Mover para ${colunaProxima}`}
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

        <button
          type="button"
          className={styles.btnDeletar}
          onClick={(event) => {
            event.stopPropagation();
            onDeletar();
          }}
        >
          <img
            src={lixeirasPorPrioridade[prioridade]}
            alt="Deletar tarefa"
            title="Deletar Tarefa"
            className={styles.iconeLixeira}
          />
        </button>
      </div>
    </li>
  );
}

export default TarefaItem;