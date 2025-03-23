import { Component, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app-lista-de-compras';
  listaDeCompras!: Array<Item>;
  listaCompleta!:any;
  novaLista: Data[] = [];
  myList:any[] = [];

  constructor(private readonly _listaDeComprasService: ListaDeCompraService) {}

  ngOnInit(): void {
    this.listaDeCompras = this._listaDeComprasService.getListaDeCompra();
    this.transformarLista();
    this.transformToListObjetc(this.novaLista);
  }

  transformarLista() {
    this.listaDeCompras.forEach((objetoLista) => {
      const valores: any = {
        data: {},
        children: [],
      };
      Object.entries(objetoLista).forEach((valorDoObjeto) => {
        if (Array.isArray(valorDoObjeto[1])) {
          let data: any = {};
          data['data'] =
            valorDoObjeto[0].charAt(0).toUpperCase() +
            valorDoObjeto[0].slice(1);
          data['children'] = valorDoObjeto[1];
          valores.children.push(data);
        } else if (
          typeof valorDoObjeto[1] === 'object' &&
          valorDoObjeto[1] !== null
        ) {
          Object.entries(valorDoObjeto[1]).forEach((atributo: any) => {
            valores.data[
              atributo[0].charAt(0).toUpperCase() + valorDoObjeto[0].slice(1)
            ] = atributo[1];
          });
        } else {
          valores.data[
            valorDoObjeto[0].charAt(0).toUpperCase() + valorDoObjeto[0].slice(1)
          ] = valorDoObjeto[1];
        }
      });
      this.novaLista.push(valores);
    });
  }

  transformToListObjetc(lista:any) {
    lista.forEach((value:any) => {
      const valueData = Object.entries(value.data).map(([key, value]) => ({
        field: key,
        value: value,
      }));

      this.myList = this.myList.concat(valueData);
      if (value.children.length > 0) {
        let valueChildren: any = {};
        value.children.forEach((item:any) => {
          if (item.children.length > 1) {
            valueChildren = item.children.reduce(
              (acc: any, child: any) => {
                return {field: item.data,value: acc.value
                    ? acc.value + ' | ' + Object.values(child).join(' ')
                    : Object.values(child).join(' '),
                };
              },
              { field: item.data, value: '' }
            );
          } else {
            const child = item.children[0];
            valueChildren = {
              field: item.data,
              value: Object.values(child).join(' | '),
            };
          }
          this.myList.push(valueChildren);
        });
      }
    }, {});

    this.gerarCsv(this.myList);
  }

  gerarCsv(lista:any){
    console.log(lista);
    let header = '';
    let linha = '';
    lista.forEach((item:any) => {
      header += Object.values(item)[0] + ',';
    });
    lista.forEach((l:any) => {
      linha += Object.values(l)[1] + ',';
    });
    console.log(linha)
    this.listaCompleta = [header, linha].join("\n");

  }

  download(){
    const blob = new Blob([this.listaCompleta],{type: 'text:csv;charset=utf-8'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'arquivo.csv';
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}



export interface Data {
  data: any;
  children: any[];
}
