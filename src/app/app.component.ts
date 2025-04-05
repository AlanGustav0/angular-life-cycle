import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,DoCheck {
  title = 'app-lista-de-compras';
  listaDeCompras!: Array<Item>;
  itemParaEditar!: Item;
  myList: any[] = [];

  constructor(private readonly _listaDeComprasService: ListaDeCompraService) {}


  ngOnInit(): void {
    this.listaDeCompras = this._listaDeComprasService.getListaDeCompra();
  }

  editarItem(event: Item) {
    this.itemParaEditar = event;
  }

  download() {
    const blob = new Blob([this.gerarCsv(this.listaDeCompras)], {
      type: 'text:csv;charset=utf-8',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'arquivo.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private gerarCsv(lista: any): string {
    let header = Object.keys(lista).join(',');
    let linha = Object.values(lista).join(',');

    return [header, linha].join('\n');
  }

  ngDoCheck(): void {
    this._listaDeComprasService.atualizarLocalStorage();
  }
}
