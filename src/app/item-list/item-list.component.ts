import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item/item.service';
import { Item } from '../model/item';
import { Router } from '@angular/router';
import { UnitMeasurement } from '../model/unit-measurement';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  itemList: Item[];
  cols: any[];
  UnitMeasurement = UnitMeasurement;

  constructor(
    private _itemService: ItemService, 
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService) { }

  ngOnInit() {
    this.getItemList();
  }

  getItemList() {
    this.itemList = this._itemService.list();
  }

  add() {
    this._router.navigate(['/item']);
  }

  edit(item: Item) {
    this._router.navigate(['/item/' + item.key]);
  }

  remove(item: Item) {
    this._confirmationService.confirm({
        message: 'Tem certeza que deseja excluir o item selecionado?',
        accept: () => {
          try {
            this._itemService.delete(item.key);
            this.getItemList();
            this._messageService.add({severity:'success', summary:'Sucesso', detail:'Item removido com sucesso'});
          } catch (ex){
            this._messageService.add({severity:'error', summary:'Erro', detail:'Ocorreu um erro ao tentar remover o item'});
          }
        }
    });
}
}
