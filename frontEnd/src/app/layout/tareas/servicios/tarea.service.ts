import { TareaModel } from './../../../model/tarea.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class TareaService {
 
  userList: TareaModel[];
  tarea: TareaModel;

  constructor(private Http: HttpClient) { 
    this.tarea = new TareaModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getTareas(): Observable<TareaModel[]>{
    return this.Http.get<TareaModel[]>("http://localhost:8080/getAllTareas");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getTareaById(s): Observable<TareaModel>{
    return this.Http.post<TareaModel>("http://localhost:8080/getTareaById", s);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateTarea(tareaId, estado){
    this.tarea.id = tareaId;
    return this.Http.post<TareaModel>("http://localhost:8080/updateTarea", JSON.stringify(this.tarea));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteTarea(tarea){    
    this.tarea = tarea;
    return this.Http.post<TareaModel>("http://localhost:8080/deleteTarea", JSON.stringify(this.tarea));   
  }

}
