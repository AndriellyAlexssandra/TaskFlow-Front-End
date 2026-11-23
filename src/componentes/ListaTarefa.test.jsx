import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaTarefas from "./ListaTarefas";

function tarefasExemplo() {
  return [
    {
      id: 1,
      texto: "Modelar o banco",
      prioridade: "Alto",

      prioridade_cor: "#EF4444",
      usuario: "Ana Lima",
      projeto: "TaskFlow",
    },

    {
      id: 2,
      texto: "Criar a API",
      prioridade: "Médio",

      prioridade_cor: "#F59E0B",
      usuario: "Bruno Melo",
      projeto: "TaskFlow",
    },

    {
      id: 3,
      texto: "Testar o front",
      prioridade: "Baixo",

      prioridade_cor: "#22C55E",
      usuario: null,
      projeto: null,
    },
  ];
}

describe("ListaTarefas", () => {
  test("lista vazia monstra a mensagem e nenhuma lista", () => {
    render(<ListaTarefas tarefas={[]} onDeletar={vi.fn()} />);

    const mensagem = screen.getByText(
      "Ainda não há tarefas cadastradas aqui :/",
    );

    expect(mensagem).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
  test("com 3 tarefa, monstra 3 itens", () => {
    render(<ListaTarefas tarefas={tarefasExemplo()} onDeletar={vi.fn()} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
  test('tarefa sem resposável monstra "Sem responsável"', () => {
    render(<ListaTarefas tarefas={tarefasExemplo()} onDeletar={vi.fn()} />);
    expect(screen.getByText("Sem responsável")).toBeInTheDocument();
  });

  test("X da segunda tarefa chama o onDeletar com o id 2", async () => {
    const user = userEvent.setup();
    const onDeletar = vi.fn();
    render(<ListaTarefas tarefas={tarefasExemplo()} onDeletar={onDeletar} />);

    const botoesX = screen.getAllByRole("button", { name: "Deletar tarefa" });
    await user.click(botoesX[1]);

    expect(onDeletar).toHaveBeenCalledWith(2);
  });
});
