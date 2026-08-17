//import './App.css';
//import Kanban from './componentes/Kanban'
function TesteFet() {
  const minhaPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const operacaoDeuCerto = true;

      if (operacaoDeuCerto) {
        resolve("Dados chegaram!");
      } else {
        reject("Algo deu errado");
      }
    }, 5000);
  });

  function execPromise() {
    const minhaPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true;

        if (operacaoDeuCerto) {
          resolve("Dados chegaram!");
        } else {
          reject("Algo deu errado");
        }
      }, 5000);
    });
    minhaPromise
      .then((mensagem) => {
        console.log("Sucesso:", mensagem);
      })
      .catch((erro) => {
        console.error("Error:", erro);
      });
    console.log("Promise criada, aguardando resultado");
  }

  async function buscarUsuario(id) {
    try {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id,
      );
      const usuario = await resposta.json();
      console.log("Nome:", usuario.name);
      return usuario;
    } catch (erro) {
      console.log("Error:", erro.message);
      return null;
    } finally {
      console.log("Finalizado");
    }
  }
  buscarUsuario(7);

  return (
    <div>
      <button
        onClick={() => {
          minhaPromise
            .then((mensagem) => {
              console.log("Sucesso:", mensagem);
            })
            .catch((erro) => {
              console.error("Error:", erro);
            });
          console.log("Promise criada, aguardando resultado");
        }}
      >
        Testar Promise
      </button>
      <button onClick={execPromise}>Teste 2</button>
      <button onClick={buscarUsuario}>Buscar usuário</button>
    </div>
  );
}
export default TesteFet;
