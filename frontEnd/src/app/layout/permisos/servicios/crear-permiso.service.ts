import { PermisoComponent } from './../permiso.component';
import { PermisoModel } from './../../../model/permiso.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearPermisoService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param permiso 
   */
  public validate(permiso: PermisoModel): boolean {
    let isValid = true;
    
    /*if(!permiso.rol.rolId){
       isValid = false;
    }*/
    
    return isValid;
  } 

  public saveOrUpdate(permiso: PermisoModel): Observable<RestResponse> {
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdatePermiso", JSON.stringify(permiso));
  }

}
