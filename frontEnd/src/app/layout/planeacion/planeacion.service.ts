import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../../model/employee';
import {PlaneacionModel} from '../../model/planeacion.model';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';



@Injectable()
export class PlaneacionService {

  constructor(private http: HttpClient) { }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getAll(): Observable<PlaneacionModel[]>{

    return this.http.get<PlaneacionModel[]>("http://localhost:8080/Planeacion")

  }

  public saveOrUpdate(planeacion: PlaneacionModel): Observable<RestResponse> {
    console.log(planeacion);
    return this.http.post<RestResponse>("http://localhost:8080/Planeacion", planeacion);
  }

 public delete(id): Observable<RestResponse> {

    return this.http.delete<RestResponse>("http://localhost:8080/deletePlaneacion", {params:{"id":id}});

  }

}
