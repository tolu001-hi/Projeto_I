import { Request, Response } from "express";
import * as carroService from "../services/carroService";

function handleErro(res: Response, erro: any): void {
  if (erro.status && erro.mensagem) {
    res.status(erro.status).json({ erro: erro.mensagem });
  } else {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

export function listar(req: Request, res: Response): void {
  try {
    res.status(200).json(carroService.listarCarros());
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function listarDisponiveis(req: Request, res: Response): void {
  try {
    res.status(200).json(carroService.listarCarrosDisponiveis());
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function buscarPorId(req: Request, res: Response): void {
  try {
    res.status(200).json(carroService.buscarCarroPorId(Number(req.params.id)));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function criar(req: Request, res: Response): void {
  try {
    res.status(201).json(carroService.criarCarro(req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function atualizar(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(carroService.atualizarCarro(Number(req.params.id), req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function remover(req: Request, res: Response): void {
  try {
    carroService.removerCarro(Number(req.params.id));
    res.status(200).json({ mensagem: "Carro removido com sucesso" });
  } catch (erro) {
    handleErro(res, erro);
  }
}
