import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../../model/employee';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';
import { EnterpriseModel } from '../../model/enterprise';
import { CargoModel } from '../../model/cargo.model';



@Injectable()
export class EmployeeService {

  EmployeeList: EmployeeModel[];
  employee: EmployeeModel;
  enterprise: EnterpriseModel;


  constructor(private http: HttpClient) {
    this.enterprise = new EnterpriseModel();
   }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getAll(): Observable<EmployeeModel[]>{

    return this.http.get<EmployeeModel[]>("http://localhost:8080/getAllEmpleados")

  }
  /*
  public saveOrUpdate(employee: EmployeeModel): Observable<RestResponse> {
    console.log(employee);
    return this.http.post<RestResponse>("http://localhost:8080/empleado/create", JSON.stringify(employee));
  }
  */

 public getEmployeeForEnterprise(id): Observable<EmployeeModel[]>{

  console.log(id);

  this.enterprise.id = id;

  return this.http.post<EmployeeModel[]>("http://localhost:8080/getAllEmployeesToEnterprise", JSON.stringify(this.enterprise));      
}

 public saveOrUpdate(employee: EmployeeModel): Observable<RestResponse> {
  //console.log("======================EMPLEADO============================");
  //console.log(employee.imagen);
  const url = '';
  return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateEmpleado", employee);
}


  public delete(employee: EmployeeModel): Observable<RestResponse> {
    console.log(employee);

    return this.http.post<RestResponse>("http://localhost:8080/deleteEmpleado", JSON.stringify(employee) );

  }

}
