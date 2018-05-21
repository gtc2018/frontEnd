import { HerramientaComponent } from './../herramienta.component'; 
import { HerramientaModel } from './../../../model/herramienta.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearHerramientaService {

  herramientaForm = new HerramientaModel;
  herramienta= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param herramienta 
   */
  /*public validate(cargo: CargoModel): boolean {
    let isValid = true;
    if(!cargo.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }*/

  public saveOrUpdate(herramienta: HerramientaModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateHerramienta", JSON.stringify(herramienta));

  }

}
