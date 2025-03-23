export interface Item {
  id?: number | string;
  nome: string;
  data: Date | string;
  comprado: boolean;
  novoItem?: NovoItem;
  endereco?: Endereco[];
  secretaria?: Secretaria[];
}

export interface NovoItem {
  texto: string;
  cnpj: string;
}

export interface Endereco {
  rua: string;
  numero: number;
}

export interface Secretaria {
  nome: string;
  cnpj: string;
}
