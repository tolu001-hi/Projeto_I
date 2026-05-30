export interface NotaFiscal {
  id_nota_fiscal: number;
  numero_nota: string;
  data_emissao: Date;
  valor_total: number;
  id_cliente: number;
  id_vendedor: number;
  id_carro: number;
}
