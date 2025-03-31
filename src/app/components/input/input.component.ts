import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {
  @Input() itemParaSerEditado!: Item;
  editando = false;
  valorItem!: string;
  textoBtn = 'Salvar item';

  constructor(private readonly _listaCompraService: ListaDeCompraService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemParaSerEditado'].firstChange) {
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.itemParaSerEditado?.nome;
    }
  }

  ngOnInit(): void {}

  adicionarItem() {
    this._listaCompraService.adicionarItemLista(this.valorItem);
    this.limparCampo();
  }

  editarItem() {
    this._listaCompraService.editarItem(this.itemParaSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar item';
  }

  private limparCampo() {
    this.valorItem = '';
  }
}
