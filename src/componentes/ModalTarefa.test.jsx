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

    expect(
      screen.getByRole("heading", { name: "Editar tarefa" }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Tarefa")).toHaveValue("Estudar Node JS");
    expect(screen.getByLabelText("Responsável")).toHaveValue("8");
  });
  test("o que a pessoa digita aparece no campo", async () => {
    const user = userEvent.setup();
    abrirModal();

    const campo = screen.getByLabelText("Tarefa");
    await user.type(campo, "Estudar mocks");

    expect(campo).toHaveValue("Estudar mocks");
  });
  test("Cancelar e Esc chamam onFechar", async () => {
    const user = userEvent.setup();
    const onFechar = vi.fn();
    abrirModal({ onFechar });

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    await user.keyboard("{Escape}");

    expect(onFechar).toHaveBeenCalledTimes(2);
  });
  test("Salvar envia os dados e fecha o modal", async () => {
    const user = userEvent.setup();
    const onSalvar = vi.fn().mockResolvedValue();
    const onFechar = vi.fn();

    abrirModal({ onSalvar, onFechar, coluna: "afazer" });

    await user.type(screen.getByLabelText("Tarefa"), "Estudar mocks");
    await user.selectOptions(screen.getByLabelText("Prioridades"), "alta");
    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(onSalvar).toHaveBeenCalledWith({
      texto: "Estudar mocks",
      coluna: "afazer",
      prioridade_id: 1,
      usuario_id: 1,
      projeto_id: 25,
    });

    expect(onFechar).toHaveBeenCalledTimes(1);
  });
  test("a API recusa: mostra os erros e não fecha", async () => {
    const user = userEvent.setup();

    const erro400 = {
      response: { data: { erro: { detalhes: ["O texto é obrigatório."] } } },
    };
    const onSalvar = vi.fn().mockRejectedValue(erro400);
    const onFechar = vi.fn();

    abrirModal({ onSalvar, onFechar });
    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(
      await screen.findByText("O texto é obrigatório."),
    ).toBeInTheDocument();
    expect(onFechar).not.toHaveBeenCalled();
  });
  test("um onSalvar que nunca responde, o botão vira 'Salvando...' e fica desabilitado", async () => {
    const user = userEvent.setup();
    const onSalvar = vi.fn().mockReturnValue(new Promise(() => {}));
    abrirModal({ onSalvar });

    await user.type(screen.getByLabelText("Tarefa"), "Estudar mocks");

    const botaoSalvar = screen.getByRole("button", { name: /Salvar/i });
    await user.click(botaoSalvar);

    expect(botaoSalvar).toHaveTextContent("Salvando..");
    expect(botaoSalvar).toBeDisabled();
  });
  
});
