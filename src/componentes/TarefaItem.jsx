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
  const classePrioridade =
    styles["badge-prioridade"] + " " + styles["badge-" + prioridade];

  const classeItem = concluido
    ? styles.tarefa + " " + styles.concluido
    : styles.tarefa;
  const estiloCor = corPrioridade
    ? { "--cor-prioridade": corPrioridade }
    : undefined;
     const classeTexto = concluido ? styles.textoTarefa + " " + styles["texto-tarefa"] : styles.textoTarefa;

  return (
    <li className={classeItem} style={estiloCor}>
        <div className={styles.linhaPrincipal}>
          <span className={classeTexto} onDoubleClick={onEditar}>
          {texto}
          </span>

          {(usuario || projeto) && (
            <div className={styles.info}>
              {usuario && (
                <span className={styles.infoItem}>
                  <span className={styles.infoRotulo}>Responsável</span>
                  {usuario}
                </span>
              )}
              {projeto && (
                <span className={styles.infoItem}>
                  <span className={styles.infoRotulo}>Projeto</span>
                  {projeto}
                </span>
              )}
            </div>
          )}

          <span className={styles["badge-prioridade"]}>{rotuloPrioridade || "Sem prioridade"}</span>
          
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
        </div>

        <div className={styles.linhaSegundaria}>
          <span className={classePrioridade}>
            {rotuloPrioridade || prioridade}
          </span>

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
