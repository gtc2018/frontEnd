
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../model/restResponse';
import { ProyectoModel } from '../../model/proyectos';
import { UsuarioModel } from '../../model/usuario/usuario.model';
import { EnterpriseModel } from '../../model/enterprise';
import { EmployeeModel } from '../../model/employee';



@Injectable()
export class ProyectosService {
    employee: EmployeeModel = new EmployeeModel;

    // public validate(proyecto: ProyectoModel): boolean {
    //     let isValid = true;

    //     if(!proyecto.nombreContacto){
    //        isValid = false;
    //     }
    //     if(!proyecto.descripcion){
    //        isValid = false;
    //     }
    //     if(!proyecto.tipoEmpresa){
    //         isValid = false;
    //      }
    //      if(!proyecto.tipoDocumento){
    //         isValid = false;
    //      }
    //      if(!proyecto.email){
    //         isValid = false;
    //      }
    //      if(!proyecto.numeroDocumento){
    //         isValid = false;
    //      }
    //     // if(!enterprise.rolId){
    //     //    isValid = false;
    //     // }
    //     // if(!enterprise.password){
    //     //    isValid = false;
    //     // }

    //     return isValid;
    //   }

  proyectosList: ProyectoModel[];

  constructor(private Http: HttpClient) { }

  //SERVICIO CONSULTAR TODOS LOS proyectos
  public getProyectos(): Observable<ProyectoModel[]>{

    return this.Http.get<ProyectoModel[]>("http://localhost:8080/getAllProyectos");

  }

  public getAllEmployeesToEmpresaId(id): Observable<EmployeeModel[]>{

    this.employee.id=id;

     console.log(this.employee);

    // console.log(this.usuario);

    return this.Http.post<EmployeeModel[]>("http://localhost:8080/getAllEmployeesToEnterprise", JSON.stringify(this.employee) );

  }

  public saveOrUpdate(proyecto: ProyectoModel): Observable<RestResponse> {
    console.log(proyecto);
    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdateProyecto", JSON.stringify(proyecto));

  }

  public delete(proyecto: ProyectoModel): Observable<RestResponse> {
    console.log(proyecto);
    return this.Http.post<RestResponse>("http://localhost:8080/deleteProyecto", JSON.stringify(proyecto));

  }



}
