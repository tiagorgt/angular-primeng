import { Injectable } from '@angular/core';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  save(item: Item) {
    if (!item.key) {
      item.key = new Date().toJSON();
    }
    localStorage.setItem(item.key, JSON.stringify(item));
  }

  getById(key: string): Item {
    return new Item(JSON.parse(localStorage.getItem(key)));
  }

  list(): Item[] {
    let items: Item[] = [];
    let keys = Object.keys(localStorage);
    let key;

    for (let i = 0; key = keys[i]; i++) {
      items.push(new Item(JSON.parse(localStorage.getItem(key))));
    }

    return items;
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
