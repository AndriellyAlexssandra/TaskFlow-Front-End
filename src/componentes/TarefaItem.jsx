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
  onDeletar,
  onEditar,
  onMover = null,
  colunaAnterior = null,
  colunaProxima = null,
  cidade = "",
}) {
  const classePrioridade =
    styles["badge-prioridade"] + " " + styles["badge-" + prioridade];

  return (
    <li onDoubleClick={onEditar}>
      <div className={styles.linhaPrincipal}>
        <span className={styles.textoTarefa} onDoubleClick={onEditar}>
          {texto}
        </span>
        <div className={styles.acoes}>
          {colunaAnterior && (
            <button
              type="button"
              className={styles.btnMover}
              onClick={(event) => {
                event.stopPropagation();
                onMover(colunaAnterior);
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
                onMover(colunaProxima);
              }}
              title={`Mover para ${colunaProxima}`}
            >
              →
            </button>
          )}
        </div>
      </div>

      <div className={styles.linhaSegundaria}>
        <span className={classePrioridade}>{prioridade}</span>
        {cidade && <span className={styles.cidade}>📍{cidade}</span>}

        <button
          className={styles.btnDeletar}
          onClick={(event) => {
            event.stopPropagation();
            onDeletar();
          }}
        >
          <img
            src={lixeirasPorPrioridade[prioridade]}
            title="Deletar Tarefa"
            className={styles.iconeLixeira}
          />
        </button>
      </div>
    </li>
  );
}
export default TarefaItem;
