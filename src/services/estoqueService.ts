import * as estoqueRepo from "../repositories/estoqueRepository";
import * as carroRepo from "../repositories/carroRepository";
import { Estoque } from "../models/Estoque";

export function listarEstoques(): Estoque[] {
  return estoqueRepo.listarTodos();
}

export function buscarEstoquePorId(id: number): Estoque {
  const estoque = estoqueRepo.buscarPorId(id);
  if (!estoque)
    throw { status: 404, mensagem: "Registro de estoque não encontrado" };
  return estoque;
}

export function buscarEstoquePorCarro(id_carro: number): Estoque {
  const estoque = estoqueRepo.buscarPorIdCarro(id_carro);
  if (!estoque)
    throw { status: 404, mensagem: "Estoque não encontrado para este carro" };
  return estoque;
}

export function criarEstoque(dados: Omit<Estoque, "id_estoque">): Estoque {
  if (
    dados.id_carro === undefined ||
    dados.quantidade === undefined ||
    !dados.localizacao_patio ||
    !dados.data_entrada
  ) {
    throw {
      status: 400,
      mensagem:
        "Campos obrigatórios: id_carro, quantidade, localizacao_patio, data_entrada",
    };
  }
  if (!carroRepo.buscarPorId(dados.id_carro)) {
    throw { status: 404, mensagem: "Carro não encontrado" };
  }
  if (!Number.isInteger(dados.quantidade) || dados.quantidade < 0) {
    throw {
      status: 400,
      mensagem: "Quantidade deve ser um inteiro maior ou igual a zero",
    };
  }
  const hoje = new Date().toISOString().split("T")[0];
  if (dados.data_entrada > hoje) {
    throw {
      status: 400,
      mensagem: "data_entrada não pode ser uma data futura",
    };
  }
  if (estoqueRepo.buscarPorIdCarro(dados.id_carro)) {
    throw {
      status: 409,
      mensagem: "Já existe estoque para este carro. Use PUT para atualizar.",
    };
  }
  return estoqueRepo.criar(dados);
}

export function atualizarEstoque(
  id: number,
  dados: Partial<Omit<Estoque, "id_estoque">>,
): Estoque {
  if (!estoqueRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Registro de estoque não encontrado" };
  }
  if (dados.quantidade !== undefined) {
    if (!Number.isInteger(dados.quantidade) || dados.quantidade < 0) {
      throw {
        status: 400,
        mensagem: "Quantidade deve ser um inteiro maior ou igual a zero",
      };
    }
  }
  if (dados.data_entrada) {
    const hoje = new Date().toISOString().split("T")[0];
    if (dados.data_entrada > hoje) {
      throw {
        status: 400,
        mensagem: "data_entrada não pode ser uma data futura",
      };
    }
  }
  return estoqueRepo.atualizar(id, dados) as Estoque;
}

export function removerEstoque(id: number): void {
  if (!estoqueRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Registro de estoque não encontrado" };
  }
  estoqueRepo.remover(id);
}
