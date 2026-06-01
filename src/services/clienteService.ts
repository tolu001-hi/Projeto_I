import * as clienteRepo from "../repositories/clienteRepository";
import * as notaRepo from "../repositories/notaFiscalRepository";
import { Cliente } from "../models/Cliente";

export function listarClientes(): Cliente[] {
  return clienteRepo.listarTodos();
}

export function buscarClientePorId(id: number): Cliente {
  const cliente = clienteRepo.buscarPorId(id);
  if (!cliente) throw { status: 404, mensagem: "Cliente não encontrado" };
  return cliente;
}

export function criarCliente(dados: Omit<Cliente, "id_cliente">): Cliente {
  if (!dados.nome || !dados.cpf || !dados.telefone) {
    throw { status: 400, mensagem: "Campos obrigatórios: nome, cpf, telefone" };
  }
  if (clienteRepo.buscarPorCpf(dados.cpf)) {
    throw { status: 409, mensagem: "CPF já cadastrado no sistema" };
  }
  return clienteRepo.criar(dados);
}

export function atualizarCliente(
  id: number,
  dados: Partial<Omit<Cliente, "id_cliente">>,
): Cliente {
  const existente = clienteRepo.buscarPorId(id);
  if (!existente) throw { status: 404, mensagem: "Cliente não encontrado" };
  if (dados.cpf && dados.cpf !== existente.cpf) {
    if (clienteRepo.buscarPorCpf(dados.cpf)) {
      throw { status: 409, mensagem: "CPF já cadastrado no sistema" };
    }
  }
  return clienteRepo.atualizar(id, dados) as Cliente;
}

export function removerCliente(id: number): void {
  if (!clienteRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Cliente não encontrado" };
  }
  const notas = notaRepo.buscarPorCliente(id);
  if (notas.length > 0) {
    throw {
      status: 422,
      mensagem: "Não é possível remover cliente com notas fiscais vinculadas",
    };
  }
  clienteRepo.remover(id);
}

export function listarNotasDoCliente(id: number) {
  if (!clienteRepo.buscarPorId(id)) {
    throw { status: 404, mensagem: "Cliente não encontrado" };
  }
  return notaRepo.buscarPorCliente(id);
}
