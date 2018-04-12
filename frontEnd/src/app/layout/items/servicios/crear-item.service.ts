import { ItemsModel } from './../../../model/items.model';
import { ItemComponent } from './../item.component';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearItemService {

  constructor(private http: HttpClient) { } 
 
  /**
   * Metodo de validaciones del formulario Items.
   * @param item 
   */
  public validate(item: ItemsModel): boolean {
    let isValid = true;
    
    if(!item.crear){
       isValid = false;
    }

    if(!item.editar){
      isValid = false;
    }

    if(!item.eliminar){
      isValid = false;
    }

    if(!item.leer){
      isValid = false;
    }
    
    return isValid;
  }

  public saveOrUpdate(item: ItemsModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateItem", JSON.stringify(item));

  }

}
