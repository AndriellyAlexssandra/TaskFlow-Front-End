import TarefaItem from "./TarefaItem.jsx";
function ListaTarefas({
  tarefas,
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
          {tarefas.map((tarefa) => (
            <TarefaItem
              key={tarefa.id}
              texto={tarefa.texto}
              prioridade={tarefa.prioridade}
              cidade={tarefa.cidade}
              onDeletar={() => onDeletar(tarefa.id)}
              onEditar={onEditar ? () => onEditar(tarefa) : undefined}
              onMover={
              onMover ? (novaColuna) => onMover(tarefa.id, novaColuna) : null}
              colunaAnterior={colunaAnterior}
              colunaProxima={colunaProxima}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
export default ListaTarefas;
