import { MenusModel } from './../../../model/menus.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MenuService {
 
  userList: MenusModel[];
  menu: MenusModel;

  constructor(private Http: HttpClient) {
      this.menu = new MenusModel();
   }

  //SERVICIO CONSULTAR TODOS LOS MENUS 
  public getMenus(): Observable<MenusModel[]>{
    return this.Http.get<MenusModel[]>("http://localhost:8080/getAllMenus");   
  }

  //SERVICIO CONSULTAR MENU BY ID
  public getMenuById(c): Observable<MenusModel>{
    return this.Http.post<MenusModel>("http://localhost:8080/getMenuById", c);   
  }

  //SERVICIO ELIMINAR MENUS BY ID
  public deleteMenu(id){
    this.menu.id = id;
    return this.Http.post<MenusModel>("http://localhost:8080/deleteMenu", JSON.stringify(this.menu));   
  }
  

}
