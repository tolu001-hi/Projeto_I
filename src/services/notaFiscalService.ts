import * as notaRepo from "../repositories/notaFiscalRepository";
import * as clienteRepo from "../repositories/clienteRepository";
import * as vendedorRepo from "../repositories/vendedorRepository";
import * as carroRepo from "../repositories/carroRepository";
import * as estoqueRepo from "../repositories/estoqueRepository";
import { NotaFiscal } from "../models/NotaFiscal";

export function listarNotas(): NotaFiscal[] {
  return notaRepo.listarTodas();
}

export function buscarNotaPorId(id: number): NotaFiscal {
  const nota = notaRepo.buscarPorId(id);
  if (!nota) throw { status: 404, mensagem: "Nota fiscal não encontrada" };
  return nota;
}

export function emitirNota(dados: Omit<NotaFiscal, "id_nota">): NotaFiscal {
  if (
    !dados.numero_nota ||
    !dados.data_emissao ||
    !dados.valor_total ||
    !dados.id_cliente ||
    !dados.id_vendedor ||
    !dados.id_carro
  ) {
    throw {
      status: 400,
      mensagem:
        "Campos obrigatórios: numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro",
    };
  }
  if (dados.valor_total <= 0) {
    throw { status: 400, mensagem: "valor_total deve ser maior que zero" };
  }
  const hoje = new Date().toISOString().split("T")[0];
  if (dados.data_emissao > hoje) {
    throw {
      status: 400,
      mensagem: "data_emissao não pode ser uma data futura",
    };
  }
  if (notaRepo.buscarPorNumero(dados.numero_nota)) {
    throw { status: 409, mensagem: "Número de nota já cadastrado no sistema" };
  }
  if (!clienteRepo.buscarPorId(dados.id_cliente)) {
    throw { status: 404, mensagem: "Cliente não encontrado" };
  }
  if (!vendedorRepo.buscarPorId(dados.id_vendedor)) {
    throw { status: 404, mensagem: "Vendedor não encontrado" };
  }
  if (!carroRepo.buscarPorId(dados.id_carro)) {
    throw { status: 404, mensagem: "Carro não encontrado" };
  }
  const estoque = estoqueRepo.buscarPorIdCarro(dados.id_carro);
  if (!estoque || estoque.quantidade <= 0) {
    throw { status: 422, mensagem: "Carro sem estoque disponível para venda" };
  }
  estoqueRepo.decrementarQuantidade(dados.id_carro);
  return notaRepo.criar(dados);
}
