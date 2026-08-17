import { useState, useEffect } from "react";
import Header from "../componentes/Header.jsx";
import ListaTarefas from "../componentes/ListaTarefas.jsx";
import ModalTarefa from "../componentes/ModalTarefa.jsx";
import lixeiraCinza from "../assets/lixeira-cinza.png";

function Kanban() {
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("taskflow-tarefas");
    return salvas ? JSON.parse(salvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskflow-tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const [proximoId, setProximoId] = useState(1);
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");

  useEffect(() => {
    const pendentes = tarefas.filter((t) => t.coluna !== "concluido").length;
    document.title = pendentes > 0 ? `(${pendentes}) TaskFlow` : "TaskFlow";
  }, [tarefas]);

  function salvarTarefa(dados) {
    if (dados.id !== undefined) {
      setTarefas(
        tarefas.map((t) => (t.id === dados.id ? { ...t, ...dados } : t)),
      );
    } else {
      const novaTarefa = {
        ...dados,
        id: proximoId,
      };
      setTarefas([...tarefas, novaTarefa]);
      setProximoId(proximoId + 1);
    }
  }

  const deletarTarefa = (id) => {
    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );
    if (confirmado) {
      setTarefas(tarefas.filter((t) => t.id !== id));
    }
  };
  const limparColuna = (nomeColuna) => {
    const confirmado = window.confirm(
      "Tem certeza que deseja limpar todas as tarefas desta coluna?",
    );
    if (confirmado) {
      setTarefas(tarefas.filter((t) => t.coluna !== nomeColuna));
    }
  };

  const moverTarefa = (id, novaColuna) => {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, coluna: novaColuna } : t)),
    );
  };

  const tarefasPorColuna = (nomeColuna) => {
    return tarefas.filter((t) => {
      const bateColuna = t.coluna === nomeColuna;
      const batePrioridade =
        filtroPrioridade === "todas" || t.prioridade === filtroPrioridade;
      return bateColuna && batePrioridade;
    });
  };
  const totalTarefas = tarefas.length;
  const pendentes = tarefas.filter((t) => t.coluna !== "concluido").length;
  const concluidas = tarefas.filter((t) => t.coluna === "concluido").length;

  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }
  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  }

  return (
    <div id="Kanban">
      <Header
        titulo="TaskFlow🚀"
        subtitulo="Bem vindo(a), Coloque sua rotina em ordem em um clique!"
        total={totalTarefas}
        pendentes={pendentes}
        concluidas={concluidas}
      />
      <main className="container">
        <section id="filtros">
          <button
            type="button"
            className={`btn-filtro ${filtroPrioridade === "todas" ? "ativo" : ""}`}
            onClick={() => setFiltroPrioridade("todas")}
          >
            Todas
          </button>
          <button
            type="button"
            className={`btn-filtro ${filtroPrioridade === "alta" ? "ativo" : ""}`}
            onClick={() => setFiltroPrioridade("alta")}
          >
            🔴 Alta
          </button>
          <button
            type="button"
            className={`btn-filtro ${filtroPrioridade === "media" ? "ativo" : ""}`}
            onClick={() => setFiltroPrioridade("media")}
          >
            🟡 Média
          </button>
          <button
            type="button"
            className={`btn-filtro ${filtroPrioridade === "baixa" ? "ativo" : ""}`}
            onClick={() => setFiltroPrioridade("baixa")}
          >
            🟢 Baixa
          </button>
        </section>
        <div className="kanban-quadro">
          <div className="kanban-coluna">
            <div className="kanban-coluna-header">
              <h2>A Fazer</h2>
              <div className="kanban-coluna-header-acoes">
                <span className="kanban-contador">
                  {tarefasPorColuna("afazer").length}
                </span>
                <button
                  className="kanban-btn-add"
                  onClick={() => abrirModalCriar("afazer")}
                  title="Incluir tarefa"
                >
                  +
                </button>
                <button
                  className="kanban-btn-limpar"
                  onClick={() => limparColuna("afazer")}
                  
                >
                  <img
                    src={lixeiraCinza}
                    title="Deletar todas as tarefas desta coluna."
                    class="icon-trash"
                  ></img>
                </button>
              </div>
            </div>

            <ListaTarefas
              tarefas={tarefasPorColuna("afazer")}
              onDeletar={deletarTarefa}
              onMover={moverTarefa}
              colunaAnterior={null}
              colunaProxima="andamento"
              onEditar={abrirModalEditar}
            />
          </div>

          <div className="kanban-coluna">
            <div className="kanban-coluna-header">
              <h2>Em Andamento</h2>
              <div className="kanban-coluna-header-acoes">
                <span className="kanban-contador">
                  {tarefasPorColuna("andamento").length}
                </span>
                <button
                  className="kanban-btn-add"
                  onClick={() => abrirModalCriar("andamento")}
                  title="Incluir tarefa"
                >
                  +
                </button>
                <button
                  className="kanban-btn-limpar"
                  onClick={() => limparColuna("andamento")}
                >
                  <img
                    src={lixeiraCinza}
                    title="Deletar todas as tarefas desta coluna."
                    className="icon-trash"
                  ></img>
                </button>
              </div>
            </div>
            <ListaTarefas
              tarefas={tarefasPorColuna("andamento")}
              onDeletar={deletarTarefa}
              onMover={moverTarefa}
              colunaAnterior="afazer"
              colunaProxima="concluido"
              onEditar={abrirModalEditar}
            />
          </div>

          <div className="kanban-coluna">
            <div className="kanban-coluna-header">
              <h2>Concluído</h2>
              <div className="kanban-coluna-header-acoes">
                <span className="kanban-contador">
                  {tarefasPorColuna("concluido").length}
                </span>
                <button
                  className="kanban-btn-add"
                  onClick={() => abrirModalCriar("concluido")}
                  title="Incluir tarefa"
                >
                  +
                </button>
                <button
                  className="kanban-btn-limpar"
                  onClick={() => limparColuna("concluido")}
                  
                >
                  <img
                    src={lixeiraCinza}
                    title="Deletar todas as tarefas desta coluna"
                    className="icon-trash"
                  ></img>
                </button>
              </div>
            </div>
            <ListaTarefas
              tarefas={tarefasPorColuna("concluido")}
              onDeletar={deletarTarefa}
              onMover={moverTarefa}
              colunaAnterior="andamento"
              colunaProxima={null}
              onEditar={abrirModalEditar}
            />
          </div>
        </div>
        <ModalTarefa
          aberto={modalAberto}
          onFechar={() => setModalAberto(false)}
          onSalvar={salvarTarefa}
          tarefa={tarefaEditando}
          coluna={colunaAtiva}
        />
      </main>

      <footer>
        <p>
          TaskFlow &copy; 2026 &mdash; Andrielly Alexssandra Santos de Paula.
          &mdash; SENAI CTGAS-ER &mdash; Centro de Tecnologias do Gás e Energias
          Renováveis.
        </p>
      </footer>
    </div>
  );
}
export default Kanban;