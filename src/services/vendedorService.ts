import * as vendedorRepo from "../repositories/vendedorRepository";
import * as notaRepo from "../repositories/notaFiscalRepository";
import { Vendedor } from "../models/Vendedor";

export function listarVendedores(): Vendedor[] {
  return vendedorRepo.listarTodos();
}

export function buscarVendedorPorId(id: number): Vendedor {
  const vendedor = vendedorRepo.buscarPorId(id);
  if (!vendedor) throw { status: 404, mensagem: "Vendedor não encontrado" };
  return vendedor;
}

export function criarVendedor(dados: Omit<Vendedor, "id_vendedor">): Vendedor {
  if (
    !dados.nome ||
    !dados.matricula ||
    dados.comissao_percentual === undefined
  ) {
    throw {
      status: 400,
      mensagem: "Campos obrigatórios: nome, matricula, comissao_percentual",
    };
  }
  if (dados.comissao_percentual < 0 || dados.comissao_percentual > 30) {
    throw {
      status: 400,
      mensagem: "comissao_percentual deve ser entre 0 e 30",
    };
  }
  if (vendedorRepo.buscarPorMatricula(dados.matricula)) {
    throw { status: 409, mensagem: "Matrícula já cadastrada no sistema" };
  }
  return vendedorRepo.criar(dados);
}

export function atualizarVendedor(
  id: number,
  dados: Partial<Omit<Vendedor, "id_vendedor">>,
): Vendedor {
  const existente = vendedorRepo.buscarPorId(id);
  if (!existente) throw { status: 404, mensagem: "Vendedor não encontrado" };
  if (dados.comissao_percentual !== undefined) {
    if (dados.comissao_percentual < 0 || dados.comissao_percentual > 30) {
      throw {
        status: 400,
        mensagem: "comissao_percentual deve ser entre 0 e 30",
      };
    }
  }
  if (dados.matricula && dados.matricula !== existente.matricula) {
    if (vendedorRepo.buscarPorMatricula(dados.matricula)) {
      throw { status: 409, mensagem: "Matrícula já cadastrada no sistema" };
    }
  }
  return vendedorRepo.atualizar(id, dados) as Vendedor;
}

export function removerVendedor(id: number): void {
  if (!vendedorRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Vendedor não encontrado" };
  }
  if (notaRepo.buscarPorVendedor(id).length > 0) {
    throw {
      status: 422,
      mensagem: "Não é possível remover vendedor com notas fiscais vinculadas",
    };
  }
  vendedorRepo.remover(id);
}

export function listarNotasDoVendedor(id: number) {
  if (!vendedorRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Vendedor não encontrado" };
  }
  return notaRepo.buscarPorVendedor(id);
}
