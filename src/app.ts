import express from "express";

import * as clienteController from "./controllers/clienteController";
import * as vendedorController from "./controllers/vendedorController";
import * as carroController from "./controllers/carroController";
import * as estoqueController from "./controllers/estoqueController";
import * as notaFiscalController from "./controllers/notaFiscalController";

const app = express();
app.use(express.json());

app.get("/clientes", clienteController.listar);
app.get("/clientes/notas/:id", clienteController.listarNotas);
app.get("/clientes/:id", clienteController.buscarPorId);
app.post("/clientes", clienteController.criar);
app.put("/clientes/:id", clienteController.atualizar);
app.delete("/clientes/:id", clienteController.remover);

app.get("/vendedores", vendedorController.listar);
app.get("/vendedores/notas/:id", vendedorController.listarNotas);
app.get("/vendedores/:id", vendedorController.buscarPorId);
app.post("/vendedores", vendedorController.criar);
app.put("/vendedores/:id", vendedorController.atualizar);
app.delete("/vendedores/:id", vendedorController.remover);

app.get("/carros/disponiveis", carroController.listarDisponiveis);
app.get("/carros", carroController.listar);
app.get("/carros/:id", carroController.buscarPorId);
app.post("/carros", carroController.criar);
app.put("/carros/:id", carroController.atualizar);
app.delete("/carros/:id", carroController.remover);

app.get("/estoque", estoqueController.listar);
app.get("/estoque/carro/:id_carro", estoqueController.buscarPorCarro);
app.get("/estoque/:id", estoqueController.buscarPorId);
app.post("/estoque", estoqueController.criar);
app.put("/estoque/:id", estoqueController.atualizar);
app.delete("/estoque/:id", estoqueController.remover);

app.get("/notas", notaFiscalController.listar);
app.get("/notas/:id", notaFiscalController.buscarPorId);
app.post("/notas", notaFiscalController.emitir);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
