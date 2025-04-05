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

  deletarItem(idItem:number){
    const index = this.listaDeCompras.findIndex(item => item.id == idItem);
    this.listaDeCompras.splice(index,1);
  }

  limparLista(){
    this.listaDeCompras = [];
    this._listaDeComprasService.limparListaDeCompras();
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
    let header = Object.keys(lista[0]).join(',');
    let linha = lista.map((item:string) => Object.values(item).join(','));

    return [header, ...linha].join('\n');
  }

  ngDoCheck(): void {
    console.log('chamado')
    this._listaDeComprasService.atualizarLocalStorage();
  }
}
