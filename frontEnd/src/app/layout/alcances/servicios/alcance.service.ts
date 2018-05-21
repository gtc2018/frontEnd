import { AlcanceModel } from './../../../model/alcance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class AlcanceService {
 
  userList: AlcanceModel[];
  alcance: AlcanceModel;

  constructor(private Http: HttpClient) { 
    this.alcance = new AlcanceModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getAlcances(): Observable<AlcanceModel[]>{
    return this.Http.get<AlcanceModel[]>("http://localhost:8080/getAllAlcances");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getAlcanceById(c): Observable<AlcanceModel>{
    return this.Http.post<AlcanceModel>("http://localhost:8080/getAlcanceById", c);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateAlcance(alcanceId, estado){
    this.alcance.id = alcanceId;
    return this.Http.post<AlcanceModel>("http://localhost:8080/updateAlcance", JSON.stringify(this.alcance));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteAlcance(alcance){    
    this.alcance = alcance;
    return this.Http.post<AlcanceModel>("http://localhost:8080/deleteAlcance", JSON.stringify(this.alcance));   
  }

}
