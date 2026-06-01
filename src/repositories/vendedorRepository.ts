import { Vendedor } from "../models/Vendedor";

let vendedores: Vendedor[] = [];
let proximoId = 1;

export function listarTodos(): Vendedor[] {
  return vendedores;
}

export function buscarPorId(id: number): Vendedor | undefined {
  return vendedores.find((v) => v.id_vendedor === id);
}

export function buscarPorMatricula(matricula: string): Vendedor | undefined {
  return vendedores.find((v) => v.matricula === matricula);
}

export function criar(dados: Omit<Vendedor, "id_vendedor">): Vendedor {
  const novo: Vendedor = { id_vendedor: proximoId++, ...dados };
  vendedores.push(novo);
  return novo;
}

export function atualizar(
  id: number,
  dados: Partial<Omit<Vendedor, "id_vendedor">>,
): Vendedor | undefined {
  const index = vendedores.findIndex((v) => v.id_vendedor === id);
  if (index === -1) return undefined;
  vendedores[index] = { ...vendedores[index], ...dados };
  return vendedores[index];
}

export function remover(id: number): boolean {
  const index = vendedores.findIndex((v) => v.id_vendedor === id);
  if (index === -1) return false;
  vendedores.splice(index, 1);
  return true;
}
