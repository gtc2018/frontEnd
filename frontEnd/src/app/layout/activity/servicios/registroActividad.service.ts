import { RegistroActividadModel } from './../../../model/registroActividad.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class RegistroActividadService {
 
  userList: RegistroActividadModel[];
  registroActividad: RegistroActividadModel;

  constructor(private Http: HttpClient) { 
    this.registroActividad = new RegistroActividadModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS REGISTROS DE ACTIVIDAD 
  public getRegistroActividades(): Observable<RegistroActividadModel[]>{
    return this.Http.get<RegistroActividadModel[]>("http://localhost:8080/getAllRegistroActividades");      
  } 

  //SERVICIO CONSULTAR UN REGISTRO POR ID
  public getRegistroActividadById(s): Observable<RegistroActividadModel>{
    this.registroActividad.id = s;
    return this.Http.post<RegistroActividadModel>("http://localhost:8080/findByRegistroActividadId", JSON.stringify(this.registroActividad));   
  }
 
  //SERVICIO ACTUALIZAR UN REGISTRO
  public updateRegistroActividad(registroActividadId, estado){
    this.registroActividad.id = registroActividadId;
    return this.Http.post<RegistroActividadModel>("http://localhost:8080/updateRegistroActividad", JSON.stringify(this.registroActividad));   
  } 

  //SERVICIO ELIMINAR UN REGISTRO POR ID
  public deleteRegistroActividad(registroActividad){    
    this.registroActividad = registroActividad;
    return this.Http.post<RegistroActividadModel>("http://localhost:8080/deleteRegistroActividad", JSON.stringify(this.registroActividad));   
  }

  // SERVICIO CONSULTAR LOS REGISTROS POR EMPLEADO
  public getRegistreToEmployee(id): Observable<RegistroActividadModel[]>{

    console.log(id);
  
    this.registroActividad.id = id;
  
    return this.Http.post<RegistroActividadModel[]>("http://localhost:8080/getAllRegistreToEmployee", JSON.stringify(this.registroActividad));      
  }

  // SERVICIO CONSULTAR LOS REGISTROS POR EMPLEADO
  public getRegistreByEmployeeAndDate(id, fecha): Observable<RegistroActividadModel[]>{

    this.registroActividad.id = id;
    this.registroActividad.fechaTrabajo = fecha;

    console.log(this.registroActividad);
  
    return this.Http.post<RegistroActividadModel[]>("http://localhost:8080/getRegistreByEmployeeAndDate", JSON.stringify(this.registroActividad));      
  }

  // SERVICIO CONSULTAR LOS REGISTROS POR HORAS
  public getAllRegistreByDate(id, fecha, horaI, horaF): Observable<RegistroActividadModel[]>{
     
    this.registroActividad.id = id;
    this.registroActividad.fechaTrabajo = fecha;
    this.registroActividad.horaInicio = horaI;
    this.registroActividad.horaFin = horaF;
  
    return this.Http.post<RegistroActividadModel[]>("http://localhost:8080/getAllRegistreByDate", JSON.stringify(this.registroActividad));      
  }

}
