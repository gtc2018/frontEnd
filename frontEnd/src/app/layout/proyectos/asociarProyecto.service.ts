
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../model/restResponse';
import { ProyectoModel } from '../../model/proyectos';
import { UsuarioModel } from '../../model/usuario/usuario.model';
import { EnterpriseModel } from '../../model/enterprise';
import { EmployeeModel } from '../../model/employee';
import { EmployeeToProject } from '../../model/employeeToProject';



@Injectable()
export class AsociarProyectoService {

  employeesToProject= [];

  employeeToProject: EmployeeToProject;

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private Http: HttpClient) {

     this.employeeToProject = new EmployeeToProject();

  }

  //SERVICIO CONSULTAR TODOS LOS proyectos
  public getAllForProject(id:string): Observable<EmployeeToProject[]>{

    console.log(id);

    return this.Http.get<EmployeeToProject[]>("http://localhost:8080/AsociarProyecto/getAllAsociarProyecto",{params:{id:id}});

}

  public saveOrUpdateEmployeesToProject(id, model: any[]): Observable<RestResponse> {

    console.log(model,id);

    this.employeesToProject= [];

    for(var i=0;i<model.length;i++){

        console.log(i);
        console.log(model[i].id);

this.employeeToProject = new EmployeeToProject();

        this.employeeToProject.proyectoId = id;
        this.employeeToProject.empleadoId = model[i].id;

        this.employeesToProject.push(this.employeeToProject);
    };

    console.log(this.employeesToProject);

    return this.Http.post<RestResponse>(
        "http://localhost:8080/AsociarProyecto/saveOrUpdateAsociarProyecto",
        this.employeesToProject, {headers: this.headers}
        );
  }



}
