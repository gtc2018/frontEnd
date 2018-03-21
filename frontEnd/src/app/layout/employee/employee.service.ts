import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../../model/employee';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';



@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getAll(): Observable<EmployeeModel[]>{

    return this.http.get<EmployeeModel[]>("http://localhost:8080/getAllEmpleados")

  }

  public saveOrUpdate(employee: EmployeeModel): Observable<RestResponse> {
    console.log(employee);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateEmpleado", JSON.stringify(employee));
  }

  public delete(employee: EmployeeModel): Observable<RestResponse> {
    console.log(employee);

    return this.http.post<RestResponse>("http://localhost:8080/deleteEmpleado", JSON.stringify(employee) );

  }

}
