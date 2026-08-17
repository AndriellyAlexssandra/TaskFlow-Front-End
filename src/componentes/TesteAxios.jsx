import axios from "axios";
import { useState } from "react";

function TesteAxios() {
  const [texto, setTexto] = useState("");
  const [cep, setCep] = useState("");

  async function exemplo() {
    try {
      const resposta = await axios.get(
        "https://jsonplaceholder.typicode.com/users/6",
      );

      console.log("Response", resposta);
      console.log("Response Data", resposta.data);
      console.log(resposta.data.name);
      console.log(resposta.data.email);
      console.log(resposta.status);
    } catch (erro) {
      console.log(erro.message);
    }
  }

  async function consultaCep(cep) {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      console.log("CEP Data", resposta.data);
    } catch (erro) {
      console.log(erro.message);
    }
  }
  return (
    <>
      <header>
        <h1>Via Cep</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Adicione o CEP..."
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <button onClick={() => consultaCep(cep)}>Consultar CEP</button>
      </main>
    </>
  );
}
export default TesteAxios;
