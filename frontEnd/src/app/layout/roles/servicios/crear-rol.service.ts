import { RolComponent } from './../rol.component'; 
import { RolModel } from './../../../model/rol.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearRolService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param rol 
   */
  

  public saveOrUpdate(rol: RolModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateRol", JSON.stringify(rol));

  }

}
