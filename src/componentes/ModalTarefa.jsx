import { useEffect, useState } from "react";
import styles from "./ModalTarefa.module.css";
import axios from "axios";

function ModalTarefa({
  aberto,
  onFechar,
  onSalvar,
  tarefa = null,
  coluna = "afazer",
}) {
  const [texto, setTexto] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  useEffect(() => {
    if (tarefa) {
      setTexto(tarefa.texto);
      setCidade(tarefa.cidade || "");
      setPrioridade(tarefa.prioridade);
    } else {
      setTexto("");
      setCep("");
      setCidade("");
      setPrioridade("media");
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

  async function buscarCidade(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );
      if (!data.erro) setCidade(data.localidade + "/" + data.uf);
    } catch (e) {
      console.log("CEP não encontrado ou inválido", e);
      setCidade("");
    }
  }

  function handleSalvar() {
    if (texto.trim() === "") return;

    onSalvar({
      id: tarefa?.id,
      texto,
      cidade,
      prioridade,
      coluna: tarefa?.coluna || coluna,
    });
    onFechar();
  }
  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2>{tarefa ? "Editar tarefa" : "Incluir Tarefa"}</h2>
        <input
          placeholder="Texto da tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <input
          placeholder="CEP(opcional)"
          value={cep}
          onChange={(e) => {
            setCep(e.target.value);
            buscarCidade(e.target.value);
          }}
          maxLength={9}
        />
        {cidade && <p className={styles.cidade}>{cidade}</p>}

        <select className="sel-prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="alta">🔴Alta</option>
          <option value="media">🟡Média</option>
          <option value="baixa">🟢Baixa</option>
        </select>
        <div className={styles.botoes}>
          <button onClick={onFechar}>Cancelar</button>
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
export default ModalTarefa;
