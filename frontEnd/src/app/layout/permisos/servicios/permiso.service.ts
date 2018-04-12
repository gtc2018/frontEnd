import { PermisoModel } from './../../../model/permiso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class PermisoService {
 
  userList: PermisoModel[];
  permiso: PermisoModel;

  constructor(private Http: HttpClient) { 
	  this.permiso = new PermisoModel();
  }

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getPermisos(): Observable<PermisoModel[]>{
    return this.Http.get<PermisoModel[]>("http://localhost:8080/getAllPermisos");   
  } 

  //SERVICIO CONSULTAR PERMISO BY ID
  public getPermisoById(c): Observable<PermisoModel>{
    return this.Http.post<PermisoModel>("http://localhost:8080/getPermisoById", c);   
  }

   //SERVICIO ELIMINAR PERMISOS BY ID
   public deletePermiso(permiso){
	     this.permiso = permiso;
      return this.Http.post<PermisoModel>("http://localhost:8080/deletePermiso", JSON.stringify(this.permiso));   
  }

  //SERVICIO ACTUALIZAR UN ROL BY ID
  public updatePermiso(permiso){
    this.permiso = permiso;
    return this.Http.post<PermisoModel>("http://localhost:8080/updatePermiso", JSON.stringify(this.permiso) 
      ) ;   
  }

}
