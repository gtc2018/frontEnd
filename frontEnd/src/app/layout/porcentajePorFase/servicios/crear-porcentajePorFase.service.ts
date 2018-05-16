import { PorcentajePorFaseComponent } from './../porcentajePorFase.component'; 
import { PorcentajePorFaseModel } from './../../../model/porcentajePorFase.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearPorcentajePorFaseService {

  porcentajePorFaseForm = new PorcentajePorFaseModel;
  porcentajePorFase= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param porcentajePorFase 
   */
  public saveOrUpdate(porcentajePorFase: PorcentajePorFaseModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdatePorcentajePorFase", JSON.stringify(porcentajePorFase));

  }

}
