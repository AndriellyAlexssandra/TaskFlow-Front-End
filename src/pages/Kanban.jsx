import Header from "../componentes/Header.jsx";
import ListaTarefas from "../componentes/ListaTarefas.jsx";
import ModalTarefa from "../componentes/ModalTarefa.jsx";
import lixeiraCinza from "../assets/lixeira-cinza.png";
import axios from "axios";
import { useState, useEffect } from "react";

function Kanban() {
  const URL_API = "https://6a85ab049c451dc67a63ecb3.mockapi.io/tarefas";

  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await axios.get(URL_API);
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

  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");

  useEffect(() => {
    const pendentes = tarefas.filter((t) => t.coluna !== "concluido").length;
    document.title = pendentes > 0 ? `(${pendentes}) TaskFlow` : "TaskFlow";
  }, [tarefas]);

  async function salvarTarefa(dados) {
    try {
      if (dados.id !== undefined) {
        const { data: tarefaEditada } = await axios.put(
          URL_API + "/" + dados.id,
          {
            texto: dados.texto,
            prioridade: dados.prioridade,
            cidade: dados.cidade,
            coluna: dados.coluna,
          },
        );
        setTarefas((tarefasAtuais) =>
          tarefasAtuais.map((t) => (t.id === dados.id ? tarefaEditada : t)),
        );
      } else {
        const { data: novaTarefa } = await axios.post(URL_API, dados);
        setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
      }
    } catch (e) {
      setErro("Erro ao salvar tarefa. Tente novamente.");
      console.error(e);
    }
  }
  async function deletarTarefa(id) {
    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );
    if (!confirmado) return;
    try {
      await axios.delete(URL_API + "/" + id);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (e) {
      setErro("Erro ao deletar tarefa. Tente novamente. ");
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

  async function moverTarefa(id, novaColuna) {
    try {
      const { data: tarefaMovida } = await axios.put(URL_API + "/" + id, {
        coluna: novaColuna,
      });
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((t) => (t.id === id ? tarefaMovida : t)),
      );
    } catch (e) {
      setErro("Erro ao mover tarefa. Tente novamente.");
      console.error(e);
    }
  }

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
        {!carregando && !erro && (
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
                      className="icon-trash"
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
        )}

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
