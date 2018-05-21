import { EstadoModel } from './../../../model/estado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class EstadoService {
 
  userList: EstadoModel[];
  estado: EstadoModel;

  constructor(private Http: HttpClient) { 
    this.estado = new EstadoModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getEstados(): Observable<EstadoModel[]>{
    return this.Http.get<EstadoModel[]>("http://localhost:8080/getAllEstados");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getEstadoById(e): Observable<EstadoModel>{
    return this.Http.post<EstadoModel>("http://localhost:8080/getEstadoById", e);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateEstado(estadoId, estado){
    this.estado.id = estadoId;
    return this.Http.post<EstadoModel>("http://localhost:8080/updateEstado", JSON.stringify(this.estado));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteEstado(estado){    
    this.estado = estado;
    return this.Http.post<EstadoModel>("http://localhost:8080/deleteEstado", JSON.stringify(this.estado));   
  }

}
