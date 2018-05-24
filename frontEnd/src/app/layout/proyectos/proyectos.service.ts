
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../model/restResponse';
import { ProyectoModel } from '../../model/proyectos';
import { UsuarioModel } from '../../model/usuario/usuario.model';
import { EnterpriseModel } from '../../model/enterprise';
import { EmployeeModel } from '../../model/employee';



@Injectable()
export class ProyectosService { 
    enterprise: EnterpriseModel = new EnterpriseModel;

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

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private Http: HttpClient) {
  }

  //SERVICIO CONSULTAR TODOS LOS proyectos
  public getProyectos(): Observable<ProyectoModel[]>{

    return this.Http.get<ProyectoModel[]>("http://localhost:8080/getAllProyectos");

  }

  public getAllEmployeesToEmpresaId(id): Observable<EmployeeModel[]>{

    this.enterprise.id=id;

     console.log(this.enterprise);

    return this.Http.post<EmployeeModel[]>("http://localhost:8080/getAllEmployeesToEnterprise", JSON.stringify(this.enterprise) );
  }

  public saveOrUpdate(proyecto: ProyectoModel): Observable<RestResponse> {
    console.log(proyecto);
    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdateProyecto", JSON.stringify(proyecto));

  }

  public delete(proyecto: ProyectoModel): Observable<RestResponse> {
    console.log(proyecto);
    return this.Http.post<RestResponse>("http://localhost:8080/deleteProyecto", JSON.stringify(proyecto));

  }


  public getProyectoByCliente(id): Observable<ProyectoModel[]> {
    this.enterprise.id=id;
    console.log(id);
    return this.Http.post<ProyectoModel[]>("http://localhost:8080/getProyectoByCliente", JSON.stringify(this.enterprise));

  }
  
}