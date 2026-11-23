import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TarefaItem from "./TarefaItem";

describe("TarefaItem", () => {
  test("monstra o texto e o rótulo da prioridade", () => {
    render(<TarefaItem texto="Estudar Vitest" rotuloPrioridade="Alto" />);

    expect(screen.getByText("Estudar Vitest")).toBeInTheDocument();
    expect(screen.getByText("Alto")).toBeInTheDocument();
  });

  test("no modo lista, não monstra as setas", () => {
    render(<TarefaItem texto="Estudar Vitest" />);

    const setaEsquerda = screen.queryByText("←");
    const setaDireita = screen.queryByText("→");
    const botaoDeletar = screen.getByRole("button", { name: "Deletar tarefa" });

    expect(setaEsquerda).not.toBeInTheDocument();
    expect(setaDireita).not.toBeInTheDocument();
    expect(botaoDeletar).toBeInTheDocument();
  });
  test("na primeira coluna, só monstra a seta →", () => {
    render(
      <TarefaItem
        texto="Estudar Vitest"
        onMover={vi.fn()}
        colunaProxima="andamento"
      />,
    );
    const setaEsquerda = screen.queryByText("←");
    const setaDireita = screen.getByRole("button", {
      name: "Mover para andamento",
    });
    expect(setaEsquerda).not.toBeInTheDocument();
    expect(setaDireita).toBeInTheDocument();
    expect(setaDireita).toHaveTextContent("→");
  });
  test("clicar na → chama o onMover com a próxima coluna", async () => {
    const user = userEvent.setup();
    const onMover = vi.fn();
    render(
      <TarefaItem
        texto="Estudar Vitest"
        onMover={onMover}
        colunaProxima="andamento"
      />,
    );
    await user.click(
      screen.getByRole("button", {
        name: "Mover para andamento",
      }),
    );
    expect(onMover).toHaveBeenCalledTimes(1);
    expect(onMover).toHaveBeenCalledWith("andamento");
  });
  test("clicar no X chama o onDeletar", async () => {
    const user = userEvent.setup();
    const onDeletar = vi.fn();
    render(<TarefaItem texto="Estudar Vitest" onDeletar={onDeletar} />);

    await user.click(screen.getByRole("button", { name: "Deletar tarefa" }));
    expect(onDeletar).toHaveBeenCalledTimes(1);
  });
  test("duplo clique no texto chama o onEditar", async () => {
    const user = userEvent.setup();
    const onEditar = vi.fn();
    render(<TarefaItem texto="Estudar Vitest" onEditar={onEditar} />);

    await user.dblClick(screen.getByText("Estudar Vitest"));
    expect(onEditar).toHaveBeenCalledTimes(1);
  });
});
