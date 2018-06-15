import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';
import { DaneModel } from '../../model/dane.model';



@Injectable()
export class DaneService {
 
  pais: DaneModel[];
  departamento: DaneModel[];
  ciudad: DaneModel[];
  dane: DaneModel;

  constructor(private Http: HttpClient) { 
    this.dane = new DaneModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS PAISES
  public getCountry(): Observable<DaneModel[]>{
    return this.Http.get<DaneModel[]>("http://localhost:8080/getCountry");      
  } 

  //SERVICIO CONSULTAR TODOS LOS DEPARTAMENTOS DEL PAIS
  public getDeparment(id): Observable<DaneModel[]>{
    this.dane.id = id;
    return this.Http.post<DaneModel[]>("http://localhost:8080/getDeparment", this.dane);   
  }

  //SERVICIO CONSULTAR TODAS LAS CIUDADES DEL DEPARTAMENTO
  public getCity(id): Observable<DaneModel[]>{
    this.dane.id = id;
    return this.Http.post<DaneModel[]>("http://localhost:8080/getCity", this.dane);   
  }
 

}
