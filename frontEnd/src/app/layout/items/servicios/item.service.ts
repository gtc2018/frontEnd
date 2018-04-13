import { MenusModel } from './../../../model/menus.model';
import { ItemsModel } from './../../../model/items.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class ItemService {
 
  userList: ItemsModel[];
  item: ItemsModel;

  constructor(private Http: HttpClient) {
    this.item = new ItemsModel();
  }

  //SERVICIO CONSULTAR TODOS LOS ITEMS 
  public getItems(): Observable<ItemsModel[]>{
    return this.Http.get<ItemsModel[]>("http://localhost:8080/getAllItem");   
  }
  
  //SERVICIO CONSULTAR TODOS LOS ITEMS REFERENTES A UN MENU
  public getItemsByMenu(c): Observable<ItemsModel[]>{
    return this.Http.post<ItemsModel[]>("http://localhost:8080/getItemsByMenu", c);   
  }
  
  //SERVICIO ELIMINAR ITEMS BY ID
  public deleteItem(c){
      this.item.id = c;
      return this.Http.post<ItemsModel>("http://localhost:8080/deleteItem", JSON.stringify(this.item));   
  }

}
