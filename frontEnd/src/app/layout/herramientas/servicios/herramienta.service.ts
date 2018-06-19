import { HerramientaModel } from './../../../model/herramienta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class HerramientaService {
 
  userList: HerramientaModel[];
  herramienta: HerramientaModel;

  constructor(private Http: HttpClient) { 
    this.herramienta = new HerramientaModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getHerramientas(): Observable<HerramientaModel[]>{
    return this.Http.get<HerramientaModel[]>("http://localhost:8080/getAllHerramientas");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getHerramientaById(h): Observable<HerramientaModel>{
    return this.Http.post<HerramientaModel>("http://localhost:8080/getHerramientaById", h);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateHerramienta(herramientaId, estado){
    this.herramienta.id = herramientaId;
    return this.Http.post<HerramientaModel>("http://localhost:8080/updateHerramienta", JSON.stringify(this.herramienta));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteHerramienta(herramienta){    
    this.herramienta = herramienta;
    return this.Http.post<HerramientaModel>("http://localhost:8080/deleteHerramienta", JSON.stringify(this.herramienta));   
  }

  public saveOrUpdate(herramienta: HerramientaModel): Observable<any> {

    return this.Http.post<any>("http://localhost:8080/saveOrUpdateHerramienta", JSON.stringify(herramienta));

  }

}
