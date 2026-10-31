import styles from "./Sobre.module.css";

const recursos = [
  ["Adicionar tarefas:", "permite cadastrar novas atividades no quadro."],
  ["Editar tarefas:", "possibilita alterar informações das atividades."],
  ["Excluir tarefas:", "remove tarefas que não são mais necessárias."],
  [
    "Mover tarefas:",
    "permite avançar as atividades entre as colunas do Kanban.",
  ],
  ["Definir prioridades:", "classifica as tarefas em alta, média ou baixa."],
  [
    "Filtrar tarefas:",
    "permite visualizar atividades de acordo com a prioridade.",
  ],
  ["Contador de tarefas:", "mostra a quantidade de atividades em cada coluna."],
  ["Limpar coluna:", "remove todas as tarefas de uma etapa específica."],
  [
    "Organização visual:",
    "facilita o acompanhamento do progresso das atividades.",
  ],
];

const tecnologias = ["React", "Vite", "Axios", "React Router"];

function Sobre() {
  return (
    <main className={styles.pagina}>
      <h1 className={styles.titulo}>Sobre o Mini Kanban</h1>

      <p className={styles.paragrafo}>
        O Mini Kanban é uma aplicação desenvolvida com o objetivo de auxiliar na
        organização, no acompanhamento e no gerenciamento de atividades de forma
        visual e estruturada. O sistema utiliza o conceito de Kanban, uma
        metodologia de gerenciamento que representa as tarefas por meio de
        cartões distribuídos em diferentes etapas de um fluxo de trabalho.
      </p>

      <p className={styles.paragrafo}>
        A proposta do TaskFlow/Mini Kanban é proporcionar ao usuário uma visão
        clara do andamento de suas atividades, permitindo identificar
        rapidamente quais tarefas ainda precisam ser realizadas, quais estão em
        desenvolvimento e quais já foram concluídas. Dessa forma, o sistema
        contribui para uma melhor organização da rotina e para o acompanhamento
        do progresso das atividades.
      </p>

      <section className={styles.card}>
        <h2 className={styles.cardTitulo}>O que o Mini Kanban Faz</h2>
        <ul className={styles.lista}>
          {recursos.map(([rotulo, descricao]) => (
            <li key={rotulo}>
              <strong>{rotulo}</strong> {descricao}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.card} ${styles.cardLaranja}`}>
        <h2 className={styles.cardTitulo}>Tecnologias usadas</h2>
        <ul className={styles.tecnologias}>
          {tecnologias.map((tec) => (
            <li key={tec}>{tec}</li>
          ))}
        </ul>
      </section>

      <footer className={styles.rodape}>
        <p>
          TaskFlow &copy; 2026 &mdash; Aluno(a): Andrielly Alexssandra Santos de
          Paula.
        </p>
        <p>SENAI CTGAS-ER &mdash; Programador Full Stack</p>
      </footer>
    </main>
  );
}

export default Sobre;
