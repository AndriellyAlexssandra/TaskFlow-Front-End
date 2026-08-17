import styles from "./Sobre.module.css";

function Sobre() {
  return (
    <div className="header-texto">
      <div className={styles.tituloDescricao}>
        <h1>Sobre o Taskflow</h1>
        <p>
          O TaskFlow, ou Fluxo de Tarefas, é uma aplicação desenvolvida com o
          objetivo de auxiliar na organização, no acompanhamento e no
          gerenciamento de atividades de forma visual e estruturada. O sistema
          utiliza o conceito de Kanban, uma metodologia de gerenciamento que
          representa as tarefas por meio de cartões distribuídos em diferentes
          etapas de um fluxo de trabalho. A proposta do TaskFlow é proporcionar
          ao usuário uma visão clara do andamento de suas atividades, permitindo
          identificar rapidamente quais tarefas ainda precisam ser realizadas,
          quais estão em desenvolvimento e quais já foram concluídas. Dessa
          forma, o sistema contribui para uma melhor organização da rotina e
          para o acompanhamento do progresso das atividades.
        </p>
      </div>

      <div className={styles.texto}>
        <h3>Oque o TaskFlow Faz:</h3>
        <p><strong>Adicionar tarefas:</strong> permite cadastrar novas atividades no quadro.</p>
          <p><strong>Editar tarefas:</strong> possibilita alterar informações das atividades.</p>
          <p><strong>Excluir tarefas:</strong> remove tarefas que não são mais necessárias.</p>
          <p><strong>Mover tarefas:</strong> permite avançar as atividades entre as colunas do Kanban.</p>
          <p><strong>Definir prioridades:</strong> classifica as tarefas em alta, média ou baixa.</p>
          <p><strong>Filtrar tarefas:</strong> permite visualizar atividades de acordo com a
          prioridade. </p>
          <p><strong>Contador de tarefas:</strong> mostra a quantidade de atividades em
          cada coluna.</p>
          <p><strong>Limpar coluna:</strong> remove todas as tarefas de uma etapa
          específica.</p>
          <p><strong>Organização visual:</strong> facilita o acompanhamento do progresso
          das atividades.</p>        
      </div>
      <main>
        <div className={styles.tecnologias}>
          <h4>Tecnólogias usadas:</h4>
          <ul>
            <li>React</li>
            <li>Vite</li>
            <li>Axios</li>
            <li>React Router</li>
          </ul>
        </div>
      </main>
      <footer>
        <p>
          TaskFlow &copy; 2026 &mdash; Aluno(a): Andrielly Alexssandra Santos de
          Paula.
        </p>
        <p> SENAI CTGAS-ER &mdash; Programador Full Stack</p>
      </footer>
    </div>
  );
}
export default Sobre;
