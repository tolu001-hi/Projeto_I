import { Request, Response } from "express";
import * as notaService from "../services/notaFiscalService";

function handleErro(res: Response, erro: any): void {
  if (erro.status && erro.mensagem) {
    res.status(erro.status).json({ erro: erro.mensagem });
  } else {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

export function listar(req: Request, res: Response): void {
  try {
    res.status(200).json(notaService.listarNotas());
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function buscarPorId(req: Request, res: Response): void {
  try {
    res.status(200).json(notaService.buscarNotaPorId(Number(req.params.id)));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function emitir(req: Request, res: Response): void {
  try {
    res.status(201).json(notaService.emitirNota(req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}
