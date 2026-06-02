import { Request, Response } from "express";
import * as vendedorService from "../services/vendedorService";

function handleErro(res: Response, erro: any): void {
  if (erro.status && erro.mensagem) {
    res.status(erro.status).json({ erro: erro.mensagem });
  } else {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

export function listar(req: Request, res: Response): void {
  try {
    res.status(200).json(vendedorService.listarVendedores());
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function buscarPorId(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(vendedorService.buscarVendedorPorId(Number(req.params.id)));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function criar(req: Request, res: Response): void {
  try {
    res.status(201).json(vendedorService.criarVendedor(req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function atualizar(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(vendedorService.atualizarVendedor(Number(req.params.id), req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function remover(req: Request, res: Response): void {
  try {
    vendedorService.removerVendedor(Number(req.params.id));
    res.status(200).json({ mensagem: "Vendedor removido com sucesso" });
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function listarNotas(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(vendedorService.listarNotasDoVendedor(Number(req.params.id)));
  } catch (erro) {
    handleErro(res, erro);
  }
}
