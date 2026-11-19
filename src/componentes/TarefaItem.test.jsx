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
  test('sem prioridade, monstra "Sem prioridade"', () => {
    render(<TarefaItem texto="Estudar Vitest" />);

    expect(screen.getByText("media")).toBeInTheDocument();
  });
  test("no modo lista, não monstra as setas", () => {
    render(<TarefaItem texto="Estudar Vitest" />);

    const setaEsquerda = screen.queryByRole("button", { name: "←" });
    const setaDireita = screen.queryByRole("button", { name: "←" });
    //const botaoDeletar = screen.getByRole('button', { name: 'X' });

    expect(setaEsquerda).not.toBeInTheDocument();
    expect(setaDireita).not.toBeInTheDocument();
    //expect(botaoDeletar).toBeInTheDocument();
  });
});
