import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../../model/employee';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';
import { EnterpriseModel } from '../../model/enterprise';
import { CargoModel } from '../../model/cargo.model';
import { InvolucradoModel } from '../../model/involucrado.model';



@Injectable()
export class EmployeeService {

  EmployeeList: EmployeeModel[];
  employee: EmployeeModel;
  enterprise: EnterpriseModel;
  involved: InvolucradoModel;


  constructor(private http: HttpClient) {
    this.enterprise = new EnterpriseModel();
    this.employee = new EmployeeModel();
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

  //Buscar los involucrados que no pertenecen a un rqm
 public getEmployeeByRequest(id, id2): Observable<EmployeeModel[]>{

  this.employee.areaId = id;
  this.employee.clienteId = id2  
  console.log(this.employee);

  return this.http.post<EmployeeModel[]>("http://localhost:8080/getEmployeeByRequest", JSON.stringify(this.employee));      
}

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

  //Servicio eliminar involucrado
  public deleteInvolved(involved: InvolucradoModel): Observable<RestResponse> {
    console.log(involved);

    return this.http.post<RestResponse>("http://localhost:8080/deleteInvolucrado", JSON.stringify(involved) );

  }

}
