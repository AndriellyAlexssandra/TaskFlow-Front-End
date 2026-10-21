import { useEffect, useState } from "react";
import styles from "./ModalTarefa.module.css";

import { mensagensdeErro } from "../api";
import { useAuth } from "../contexts/AuthContext";

function paraNumero(valor) {
  return valor ? Number(valor) : null;
}

function ModalTarefa({
  aberto,
  onFechar,
  onSalvar,
  tarefa = null,
  coluna = "afazer",
  prioridades = [],
  usuarios = [],
  projetos = [],
}) {
const { usuario } = useAuth();
const [texto, setTexto] = useState("");
const [idPrioridade, setIdPrioridade] = useState(2);
const [idUsuario, setIdUsuario] = useState("");
const [idProjeto, setIdProjeto] = useState("");
const [erros, setErros] = useState([]);
const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    setErros([]);
    if (tarefa) {
      setTexto(tarefa.texto);
      setIdPrioridade(tarefa.prioridade_id);
      setIdUsuario(tarefa.usuario_id);
      setIdProjeto(tarefa.projeto_id);
    } else {
      setTexto("");
      setIdPrioridade(2);
      setIdUsuario(usuario?.id || usuarios[0]?.id || "");
      setIdProjeto(projetos[0]?.id || "");
    }
  }, [tarefa, aberto]);

  useEffect(() => {
    if (!aberto) return;

    function handleEsc(e) {
      if (e.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [aberto, onFechar]);

  async function handleSalvar() {
    if (texto.trim() === "") return;
    setErros([]);
    setSalvando(true);
    try {
      await onSalvar({
        ...tarefa,
        id: tarefa?.id,
        texto,
        coluna: tarefa?.coluna || coluna,
        prioridade_id: paraNumero(idPrioridade),
        usuario_id: paraNumero(idUsuario),
        projeto_id: paraNumero(idProjeto),
      });
      onFechar();
    } catch (e) {
      setErros(mensagensdeErro(e));
    } finally {
      setSalvando(false);
    }
  }
  if (!aberto) return null;

  return (
    //<div className={styles.overlay} onClick={onFechar}>
    <div className={styles.card} onClick={(e) => e.stopPropagation()}>
      <h2>{tarefa ? "Editar tarefa" : "Incluir Tarefa"}</h2>
      <div className={styles.campo}>
        <label htmlFor="tarefa-texto">Tarefa</label>
        <input
          placeholder="Texto da tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className={styles.campo}>
          <label htmlFor="tarefa-responsavel">Responsável</label>
          <select
            id="tarefa-responsavel"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
          >
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="tarefa-prioridade">Prioridades</label>
          <select
            id="tarefa-prioridade"
            value={idPrioridade}
            onChange={(e) => setIdPrioridade(e.target.value)}
          >
            {prioridades.map((p) => (
              <option key={p.id} value={p.id}>
                {p.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="tarefa-projeto">Projetos</label>
          <select
            id="tarefa-projeto"
            value={idProjeto}
            onChange={(e) => setIdProjeto(e.target.value)}
          >
            {projetos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
        {erros.length > 0 && (
          <ul className={styles.erros}>
            {erros.map((mensagem, i) => (
              <li key={i}>{mensagem}</li>
            ))}
          </ul>
        )}
        <div className={styles.botoes}>
          <button onClick={onFechar}>Cancelar</button>
          <button onClick={handleSalvar} disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalTarefa;
