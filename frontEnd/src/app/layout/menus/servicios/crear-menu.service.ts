import { MenuComponent } from './../menu.component';
import { MenusModel } from './../../../model/menus.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearMenuService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Menus.
   * @param menu 
   */
  public validate(menu: MenusModel): boolean {
    let isValid = true;
    
    if(!menu.descripcion){
       isValid = false;
    }

    /*if(!menu.url){
      isValid = false;
   }*/
    
    return isValid;
  }

  public saveOrUpdate(menu: MenusModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateMenu", JSON.stringify(menu));

  }

}
