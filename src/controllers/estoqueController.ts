import { Request, Response } from "express";
import * as estoqueService from "../services/estoqueService";

function handleErro(res: Response, erro: any): void {
  if (erro.status && erro.mensagem) {
    res.status(erro.status).json({ erro: erro.mensagem });
  } else {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

export function listar(req: Request, res: Response): void {
  try {
    res.status(200).json(estoqueService.listarEstoques());
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function buscarPorId(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(estoqueService.buscarEstoquePorId(Number(req.params.id)));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function buscarPorCarro(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(estoqueService.buscarEstoquePorCarro(Number(req.params.id_carro)));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function criar(req: Request, res: Response): void {
  try {
    res.status(201).json(estoqueService.criarEstoque(req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function atualizar(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(estoqueService.atualizarEstoque(Number(req.params.id), req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function remover(req: Request, res: Response): void {
  try {
    estoqueService.removerEstoque(Number(req.params.id));
    res.status(200).json({ mensagem: "Registro removido com sucesso" });
  } catch (erro) {
    handleErro(res, erro);
  }
}
