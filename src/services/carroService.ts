import * as carroRepo from "../repositories/carroRepository";
import * as estoqueRepo from "../repositories/estoqueRepository";
import * as notaRepo from "../repositories/notaFiscalRepository";
import { Carro } from "../models/Carro";

export function listarCarros(): Carro[] {
  return carroRepo.listarTodos();
}

export function listarCarrosDisponiveis(): Carro[] {
  return carroRepo.listarTodos().filter((carro) => {
    const estoque = estoqueRepo.buscarPorIdCarro(carro.id_carro);
    return estoque && estoque.quantidade > 0;
  });
}

export function buscarCarroPorId(id: number): Carro {
  const carro = carroRepo.buscarPorId(id);
  if (!carro) throw { status: 404, mensagem: "Carro não encontrado" };
  return carro;
}

export function criarCarro(dados: Omit<Carro, "id_carro">): Carro {
  if (
    !dados.marca ||
    !dados.modelo ||
    !dados.ano ||
    !dados.placa ||
    !dados.preco ||
    !dados.cor
  ) {
    throw {
      status: 400,
      mensagem: "Campos obrigatórios: marca, modelo, ano, placa, preco, cor",
    };
  }
  const anoAtual = new Date().getFullYear();
  if (
    !Number.isInteger(dados.ano) ||
    dados.ano < 1950 ||
    dados.ano > anoAtual + 1
  ) {
    throw {
      status: 400,
      mensagem: `Ano deve ser inteiro entre 1950 e ${anoAtual + 1}`,
    };
  }
  if (dados.preco <= 0) {
    throw { status: 400, mensagem: "Preço deve ser maior que zero" };
  }
  if (carroRepo.buscarPorPlaca(dados.placa)) {
    throw { status: 409, mensagem: "Placa já cadastrada no sistema" };
  }
  return carroRepo.criar(dados);
}

export function atualizarCarro(
  id: number,
  dados: Partial<Omit<Carro, "id_carro">>,
): Carro {
  const existente = carroRepo.buscarPorId(id);
  if (!existente) throw { status: 404, mensagem: "Carro não encontrado" };
  if (dados.ano !== undefined) {
    const anoAtual = new Date().getFullYear();
    if (
      !Number.isInteger(dados.ano) ||
      dados.ano < 1950 ||
      dados.ano > anoAtual + 1
    ) {
      throw {
        status: 400,
        mensagem: `Ano deve ser inteiro entre 1950 e ${anoAtual + 1}`,
      };
    }
  }
  if (dados.preco !== undefined && dados.preco <= 0) {
    throw { status: 400, mensagem: "Preço deve ser maior que zero" };
  }
  if (dados.placa && dados.placa !== existente.placa) {
    if (carroRepo.buscarPorPlaca(dados.placa)) {
      throw { status: 409, mensagem: "Placa já cadastrada no sistema" };
    }
  }
  return carroRepo.atualizar(id, dados) as Carro;
}

export function removerCarro(id: number): void {
  if (!carroRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Carro não encontrado" };
  }
  if (estoqueRepo.buscarPorIdCarro(id)) {
    throw {
      status: 422,
      mensagem: "Não é possível remover carro com registro de estoque",
    };
  }
  if (notaRepo.buscarPorCarro(id).length > 0) {
    throw {
      status: 422,
      mensagem: "Não é possível remover carro com notas fiscais vinculadas",
    };
  }
  carroRepo.remover(id);
}
