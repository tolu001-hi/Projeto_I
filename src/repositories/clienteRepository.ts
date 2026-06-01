import { Cliente } from "../models/Cliente";

let clientes: Cliente[] = [];
let proximoId: number = 1;

export function listarTodos(): Cliente[] {
  return clientes;
}

export function buscarPorId(id: number): Cliente | undefined {
  return clientes.find((cliente) => cliente.id_cliente === id);
}

export function buscarPorCpf(cpf: string): Cliente | undefined {
  return clientes.find((cliente) => cliente.cpf === cpf);
}

export function criar(dados: Omit<Cliente, "id_cliente">): Cliente {
  const novo: Cliente = { id_cliente: proximoId++, ...dados };
  clientes.push(novo);
  return novo;
}

export function atualizar(
  id: number,
  dados: Partial<Omit<Cliente, "id_cliente">>,
): Cliente | undefined {
  const index = clientes.findIndex((c) => c.id_cliente === id);
  if (index === -1) return undefined;
  clientes[index] = { ...clientes[index], ...dados };
  return clientes[index];
}

export function remover(id: number): boolean {
  const index = clientes.findIndex((c) => c.id_cliente === id);
  if (index === -1) return false;
  clientes.splice(index, 1);
  return true;
}
