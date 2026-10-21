import TarefaItem from "./TarefaItem.jsx";

const CLASSE_PRIORIDADE = { 1: "baixa", 2: "media", 3: " alta" };

function ListaTarefas({
  tarefas,
  prioridades = [],
  onEditar,
  onDeletar,
  onMover = null,
  colunaAnterior = null,
  colunaProxima = null,
}) {
  return (
    <section id="lista-section">
      {tarefas.length === 0 && (
        <p className="msg-vazia">Ainda não há tarefas cadastradas aqui :/</p>
      )}
      {tarefas.length > 0 && (
        <ul id="lista-tarefas">
          {tarefas.map((tarefa) => {
            const prioridade = prioridades.find(
              (p) => p.id === tarefa.idprioridade,
            );
            <TarefaItem
              key={tarefa.id}
              texto={tarefa.texto}
              prioridade={CLASSE_PRIORIDADE[tarefa.idprioridade] || "media"}
              rotuloPrioridade={prioridade?.descricao}
              onDeletar={() => onDeletar(tarefa.id)}
              onEditar={onEditar ? () => onEditar(tarefa) : undefined}
              onMover={
                onMover
                  ? (novaColuna) => onMover(tarefa.id, novaColuna)
                  : undefined
              }
              colunaAnterior={colunaAnterior}
              colunaProxima={colunaProxima}
            />;
          })}
        </ul>
      )}
    </section>
  );
}
export default ListaTarefas;
