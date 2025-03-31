import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/iItem';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item!: Item;
  @Output() emitindoItem = new EventEmitter();
  faPen = faPen as IconProp;
  faTrash = faTrash as IconProp;

  ngOnInit(): void { }

  editarItem(){
    this.emitindoItem.emit(this.item);
  }

}
