import api from "../api";
import Header from "../componentes/Header.jsx";
import ListaTarefas from "../componentes/ListaTarefas.jsx";
import ModalTarefa from "../componentes/ModalTarefa.jsx";
import lixeiraCinza from "../assets/lixeira-cinza.png";

import { useState, useEffect } from "react";

function Kanban() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");
        const resposta = await api.get("/tarefas");
        setTarefas(resposta.data);
      } catch (e) {
        setErro("Erro ao carregar tarefas. Verifique a conexão.");
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);

  useEffect(() => {
    const pendentes = tarefas.filter((t) => t.coluna !== "concluido").length;
    document.title = pendentes > 0 ? `(${pendentes}) TaskFlow` : "TaskFlow";
  }, [tarefas]);

  async function salvarTarefa(dados) {
    
    if (dados.id === undefined) {
      try {
        const resposta = await api.post("/tarefas", dados);
        setTarefas([...tarefas, resposta.data]);
      } catch (err) {
        setErro("Erro ao criar tarefa. Tente novamente.");
        console.error(err);
      }
    } else {
      try {
        const resposta = await api.put(`/tarefas/${dados.id}`, dados);
        setTarefas(tarefas.map((t) => (t.id === dados.id ? resposta.data : t)));
      } catch (err) {
        setErro("Erro ao editar tarefa. Tente novamente.");
        console.error(err);
      }
    }
  }

  async function moverTarefa(id, novaColuna) {
    try {
      const tarefa = tarefas.find((t) => t.id === id);
      const resposta = await api.put(`/tarefas/${id}`, {
        texto: tarefa.texto,
        prioridade: tarefa.prioridade,
        concluida: tarefa.concluida,
        coluna: novaColuna,
      });
      const tarefaMovida = resposta.data;

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((t) => (t.id === id ? tarefaMovida : t)),
      );
    } catch (e) {
      setErro("Erro ao mover tarefa. Tente novamente.");
      console.error(e);
    }
  }

  async function deletarTarefa(id) {
    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );
    if (!confirmado) return;

    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (e) {
      setErro("Erro ao deletar tarefa. Tente novamente.");
      console.error(e);
    }
  }

  const limparColuna = (nomeColuna) => {
    const confirmado = window.confirm(
      "Tem certeza que deseja limpar todas as tarefas desta coluna?",
    );
    if (confirmado) {
      setTarefas(tarefas.filter((t) => t.coluna !== nomeColuna));
    }
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

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setColunaAtiva(tarefa.coluna);
    setModalAberto(true);
  }

  return (
    <div id="Kanban">
      <Header
        titulo="Mine Kanban"
        subtitulo="Bem-vindo(a)! Organize sua rotina de forma simples e rápida."
        total={totalTarefas}
        pendentes={pendentes}
        concluidas={concluidas}
      />
      <main className="container">
        {carregando && (
          <p style={{ textAlign: "center", color: "#94A3B8" }}>
            Carregando tarefas...
          </p>
        )}
        {erro && (
          <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>
        )}

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

        {!carregando && (
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
                  >
                    +
                  </button>
                  <button
                    className="kanban-btn-limpar"
                    onClick={() => limparColuna("afazer")}
                  >
                    <img
                      src={lixeiraCinza}
                      alt="Limpar"
                      className="icon-trash"
                    />
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
                  >
                    +
                  </button>
                  <button
                    className="kanban-btn-limpar"
                    onClick={() => limparColuna("andamento")}
                  >
                    <img
                      src={lixeiraCinza}
                      alt="Limpar"
                      className="icon-trash"
                    />
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
                  >
                    +
                  </button>
                  <button
                    className="kanban-btn-limpar"
                    onClick={() => limparColuna("concluido")}
                  >
                    <img
                      src={lixeiraCinza}
                      alt="Limpar"
                      className="icon-trash"
                    />
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
        )}
      </main>

      {modalAberto && (
        <ModalTarefa
          aberto={modalAberto}
          tarefa={tarefaEditando}
          coluna={colunaAtiva}
          onSalvar={salvarTarefa}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}

export default Kanban;
