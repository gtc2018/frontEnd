import { EstadoComponent } from './../estado.component'; 
import { EstadoModel } from './../../../model/estado.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearEstadoService {

  estadoForm = new EstadoModel;
  estado= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param estado 
   */
  /*public validate(cargo: CargoModel): boolean {
    let isValid = true;
    if(!cargo.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }*/

  public saveOrUpdate(estado: EstadoModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateEstado", JSON.stringify(estado));

  }

}
