import { RolModel } from './../../../model/rol.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../../model/restResponse';



@Injectable()
export class RolService {
 
  userList: RolModel[];
  rol: RolModel;

  constructor(private Http: HttpClient) { 
    this.rol = new RolModel();
  } 


  public saveOrUpdate(rol: RolModel): Observable<RestResponse> {

    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdateRol", JSON.stringify(rol));

  }


  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getRoles(): Observable<RolModel[]>{
    return this.Http.get<RolModel[]>("http://localhost:8080/getAllRol");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getRolById(c): Observable<RolModel>{
    return this.Http.post<RolModel>("http://localhost:8080/getRolById", c);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateRol(rolId, estado){
    this.rol.id = rolId;
    this.rol.estado = estado;
    return this.Http.post<RolModel>("http://localhost:8080/updateRol", JSON.stringify(this.rol));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteRol(id){    
    this.rol.id = id;
    return this.Http.post<RolModel>("http://localhost:8080/deleteRol", JSON.stringify(this.rol));   
  }




  public validate(rol: RolModel): boolean {
    let isValid = true;
    if(!rol.descripcion){
       isValid = false; 
    }
     
    return isValid;
  }

}
