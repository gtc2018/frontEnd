import { SistemaComponent } from './../sistema.component'; 
import { SistemaModel } from './../../../model/sistema.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearSistemaService {

  sistemaForm = new SistemaModel;
  Sistema= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param sistema 
   */
  /*public validate(cargo: CargoModel): boolean {
    let isValid = true;
    if(!cargo.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }*/

  public saveOrUpdate(sistema: SistemaModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateSistema", JSON.stringify(sistema));

  }

}
