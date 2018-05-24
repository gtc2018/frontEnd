import { SistemaModel } from './../../../model/sistema.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class SistemaService {
 
  userList: SistemaModel[];
  sistema: SistemaModel;

  constructor(private Http: HttpClient) { 
    this.sistema = new SistemaModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getSistemas(): Observable<SistemaModel[]>{
    return this.Http.get<SistemaModel[]>("http://localhost:8080/getAllSistemas");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getSistemaById(s): Observable<SistemaModel>{
    return this.Http.post<SistemaModel>("http://localhost:8080/getSistemaById", s);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateSistema(sistemaId, estado){
    this.sistema.id = sistemaId;
    return this.Http.post<SistemaModel>("http://localhost:8080/updateSistema", JSON.stringify(this.sistema));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteSistema(sistema){    
    this.sistema = sistema;
    return this.Http.post<SistemaModel>("http://localhost:8080/deleteSistema", JSON.stringify(this.sistema));   
  }

}
