import { NotaFiscal } from "../models/NotaFiscal";

let notas: NotaFiscal[] = [];
let proximoId = 1;

export function listarTodas(): NotaFiscal[] {
  return notas;
}

export function buscarPorId(id: number): NotaFiscal | undefined {
  return notas.find((n) => n.id_nota === id);
}

export function buscarPorNumero(numero_nota: string): NotaFiscal | undefined {
  return notas.find((n) => n.numero_nota === numero_nota);
}

export function buscarPorCliente(id_cliente: number): NotaFiscal[] {
  return notas.filter((n) => n.id_cliente === id_cliente);
}

export function buscarPorVendedor(id_vendedor: number): NotaFiscal[] {
  return notas.filter((n) => n.id_vendedor === id_vendedor);
}

export function buscarPorCarro(id_carro: number): NotaFiscal[] {
  return notas.filter((n) => n.id_carro === id_carro);
}

export function criar(dados: Omit<NotaFiscal, "id_nota">): NotaFiscal {
  const nova: NotaFiscal = { id_nota: proximoId++, ...dados };
  notas.push(nova);
  return nova;
}
