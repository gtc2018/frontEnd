import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../../model/employee';
import {ExternalEmployeeModel} from '../../model/externalEmployee';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';



@Injectable()
export class ExternalEmployeeService {

  constructor(private http: HttpClient) { }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getAll(): Observable<EmployeeModel[]>{

    return this.http.get<EmployeeModel[]>("http://localhost:8080/getAllEmpleadoExterno")

  }

  public saveOrUpdate(employee: ExternalEmployeeModel): Observable<RestResponse> {
    console.log(employee);
    return this.http.post<RestResponse>("http://localhost:8080/empleadoExterno/create", employee);
  }

  public delete(employee: ExternalEmployeeModel): Observable<RestResponse> {
    console.log(employee);

    return this.http.post<RestResponse>("http://localhost:8080/deleteEmpleadoExterno", JSON.stringify(employee) );

  }

}
