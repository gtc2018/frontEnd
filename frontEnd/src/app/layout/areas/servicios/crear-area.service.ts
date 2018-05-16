import { AreaComponent } from './../area.component'; 
import { AreaModel } from './../../../model/area.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearAreaService {

  areaForm = new AreaModel;
  area= [];
  model: any;
  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Permisos.
   * @param area 
   */

  public saveOrUpdate(area: AreaModel): Observable<RestResponse> {

    console.log(area);  
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateArea", JSON.stringify(area));

  }

}
