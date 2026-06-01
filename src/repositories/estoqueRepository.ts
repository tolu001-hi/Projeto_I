import { Estoque } from "../models/Estoque";

let estoques: Estoque[] = [];
let proximoId = 1;

export function listarTodos(): Estoque[] {
  return estoques;
}

export function buscarPorId(id: number): Estoque | undefined {
  return estoques.find((e) => e.id_estoque === id);
}

export function buscarPorIdCarro(id_carro: number): Estoque | undefined {
  return estoques.find((e) => e.id_carro === id_carro);
}

export function criar(dados: Omit<Estoque, "id_estoque">): Estoque {
  const novo: Estoque = { id_estoque: proximoId++, ...dados };
  estoques.push(novo);
  return novo;
}

export function atualizar(
  id: number,
  dados: Partial<Omit<Estoque, "id_estoque">>,
): Estoque | undefined {
  const index = estoques.findIndex((e) => e.id_estoque === id);
  if (index === -1) return undefined;
  estoques[index] = { ...estoques[index], ...dados };
  return estoques[index];
}

export function remover(id: number): boolean {
  const index = estoques.findIndex((e) => e.id_estoque === id);
  if (index === -1) return false;
  estoques.splice(index, 1);
  return true;
}

export function decrementarQuantidade(id_carro: number): void {
  const estoque = buscarPorIdCarro(id_carro);
  if (estoque) {
    estoque.quantidade -= 1;
  }
}
