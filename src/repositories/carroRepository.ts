import { Carro } from "../models/Carro";

let carros: Carro[] = [];
let proximoId = 1;

export function listarTodos(): Carro[] {
  return carros;
}

export function buscarPorId(id: number): Carro | undefined {
  return carros.find((c) => c.id_carro === id);
}

export function buscarPorPlaca(placa: string): Carro | undefined {
  return carros.find((c) => c.placa === placa);
}

export function criar(dados: Omit<Carro, "id_carro">): Carro {
  const novo: Carro = { id_carro: proximoId++, ...dados };
  carros.push(novo);
  return novo;
}

export function atualizar(
  id: number,
  dados: Partial<Omit<Carro, "id_carro">>,
): Carro | undefined {
  const index = carros.findIndex((c) => c.id_carro === id);
  if (index === -1) return undefined;
  carros[index] = { ...carros[index], ...dados };
  return carros[index];
}

export function remover(id: number): boolean {
  const index = carros.findIndex((c) => c.id_carro === id);
  if (index === -1) return false;
  carros.splice(index, 1);
  return true;
}
