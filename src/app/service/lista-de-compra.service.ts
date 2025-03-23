import { Endereco, Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaDeCompraService {


  private listaDeCompra: Item[] = [
    {
      "id": 1,
      "nome": "Queijo prato",
      "data": "Segunda-feira (31/10/2022) às 08:30",
      "comprado": false,
      "novoItem":{
        "texto":"Novo Texto",
        "cnpj":"1234"
      },
      "endereco":[
        {
          "rua":"Rua Tres",
          "numero": 1
        },
        {
          "rua":"Rua Quatro",
          "numero": 2
        }
      ],
      "secretaria":[
        {
          "nome":"GOV BH",
          "cnpj": "12456688"
        }
      ]
    },
    {
      "id": 2,
      "nome": "Leite integral",
      "data": "Segunda-feira (31/10/2022) às 08:30",
      "comprado": false
    },
    {
      "id": 3,
      "nome": "Mamão papaia",
      "data": "Segunda-feira (31/10/2022) às 08:30",
      "comprado": true,
      "secretaria":[
        {
          "nome":"GOV BH",
          "cnpj": "12456688"
        }
      ]
    },
  ]

  constructor() {
    console.log('Instanciando dependências necessárias para o serviço.');
  }

  getListaDeCompra(){
    return this.listaDeCompra;
  }
}
