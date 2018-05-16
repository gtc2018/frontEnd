import { CargoComponent } from './../cargo.component'; 
import { CargoModel } from './../../../model/cargo.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearCargoService {

  cargoForm = new CargoModel;
  cargo= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param cargo 
   */
  /*public validate(cargo: CargoModel): boolean {
    let isValid = true;
    if(!cargo.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }*/

  public saveOrUpdate(cargo: CargoModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateCargo", JSON.stringify(cargo));

  }

}
