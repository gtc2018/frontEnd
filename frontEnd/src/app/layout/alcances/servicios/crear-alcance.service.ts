import { AlcanceComponent } from './../alcance.component'; 
import { AlcanceModel } from './../../../model/alcance.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearAlcanceService {

  alcanceForm = new AlcanceModel;
  alcance= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param alcance 
   */
  /*public validate(cargo: CargoModel): boolean {
    let isValid = true;
    if(!cargo.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }*/

  public saveOrUpdate(alcance: AlcanceModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateAlcance", JSON.stringify(alcance));

  }

}
