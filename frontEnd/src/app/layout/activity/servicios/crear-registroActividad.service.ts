//import { RegistroActividadComponent } from './../registroActividad.component'; 
import { RegistroActividadModel } from './../../../model/registroActividad.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearRegistroActividadService {

  registroActividadForm = new RegistroActividadModel;
  RegistroActividad= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param registroActividad 
   */
  /*public validate(cargo: CargoModel): boolean {
    let isValid = true;
    if(!cargo.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }*/

  public saveOrUpdate(registroActividad: RegistroActividadModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateRegistroActividad", JSON.stringify(registroActividad));

  }

}
