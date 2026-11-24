import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalTarefa from "./ModalTarefa";
import { AuthProvider } from "../contexts/AuthContext";

const prioridades = [
  { id: 1, descricao: "alta" },
  { id: 2, descricao: "media" },
  { id: 3, descricao: "baixa" },
];
const usuarios = [
  { id: 1, nome: "Francisca" },
  { id: 8, nome: "Admin" },
];
const projetos = [
  { id: 25, nome: "Arquitetar Designer" },
  { id: 21, nome: "Fazer projeto" },
];
function abrirModal(props = {}) {
  render(
    <AuthProvider>
      <ModalTarefa
        aberto={true}
        onFechar={vi.fn()}
        onSalvar={vi.fn()}
        prioridades={prioridades}
        usuarios={usuarios}
        projetos={projetos}
        {...props}
      />
    </AuthProvider>,
  );
}
describe("ModalTarefa", () => {
  test("fechado, não mostra nada", () => {
    abrirModal({ aberto: false });

    expect(screen.queryByText("Incluir Tarefa")).not.toBeInTheDocument();
  });
  test("aberto para criar, mostra o título e os campos", () => {
    abrirModal();

    expect(
      screen.getByRole("heading", { name: "Incluir Tarefa" }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Tarefa")).toHaveValue("");
    expect(screen.getByLabelText("Responsável")).toHaveValue("1");
    expect(screen.getByLabelText("Projetos")).toHaveValue("25");
    expect(screen.getByLabelText("Prioridades")).toHaveValue("2");
  });
  test("aberto para editar, vem preenchido", () => {
    const tarefa = {
      id: 29,
      texto: "Estudar Node JS",
      coluna: "afazer",

      prioridade_id: 2,
      usuario_id: 8,
      projeto_id: 21,
    };

    abrirModal({ tarefa });
  });
});
