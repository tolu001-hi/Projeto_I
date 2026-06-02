import { Request, Response } from "express";
import * as clienteService from "../services/clienteService";

function handleErro(res: Response, erro: any): void {
  if (erro.status && erro.mensagem) {
    res.status(erro.status).json({ erro: erro.mensagem });
  } else {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

export function listar(req: Request, res: Response): void {
  try {
    res.status(200).json(clienteService.listarClientes());
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function buscarPorId(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id);
    res.status(200).json(clienteService.buscarClientePorId(id));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function criar(req: Request, res: Response): void {
  try {
    res.status(201).json(clienteService.criarCliente(req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function atualizar(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id);
    res.status(200).json(clienteService.atualizarCliente(id, req.body));
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function remover(req: Request, res: Response): void {
  try {
    clienteService.removerCliente(Number(req.params.id));
    res.status(200).json({ mensagem: "Cliente removido com sucesso" });
  } catch (erro) {
    handleErro(res, erro);
  }
}

export function listarNotas(req: Request, res: Response): void {
  try {
    res
      .status(200)
      .json(clienteService.listarNotasDoCliente(Number(req.params.id)));
  } catch (erro) {
    handleErro(res, erro);
  }
}
