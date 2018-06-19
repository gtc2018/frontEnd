import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';
import { InHouseModel } from '../../model/in-house.model';
import { RestResponse } from '../../model/restResponse';

@Injectable()
export class InHouseService {
 
  inHouses: InHouseModel[];
  inHouse: InHouseModel;

  constructor(private Http: HttpClient) { 
    this.inHouse = new InHouseModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS PAISES
  public getInHouse(): Observable<InHouseModel[]>{
    return this.Http.get<InHouseModel[]>("http://localhost:8080/getAllInHouse");      
  } 

  public saveOrUpdate(inHouse: InHouseModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdateInHouse",JSON.stringify(inHouse));
  }

  public deleteInHouse(inHouse: InHouseModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/deleteInHouse",JSON.stringify(inHouse));
  }

  public getInHouseByEmployee(id): Observable<InHouseModel[]> {
    this.inHouse.id = id;
    return this.Http.post<InHouseModel[]>("http://localhost:8080/getInHouseByEmployee",JSON.stringify(this.inHouse));
  }

  /*//SERVICIO CONSULTAR TODOS LOS DEPARTAMENTOS DEL PAIS
  public getDeparment(id): Observable<DaneModel[]>{
    this.dane.id = id;
    return this.Http.post<DaneModel[]>("http://localhost:8080/getDeparment", this.dane);   
  }

  //SERVICIO CONSULTAR TODAS LAS CIUDADES DEL DEPARTAMENTO
  public getCity(id): Observable<DaneModel[]>{
    this.dane.id = id;
    return this.Http.post<DaneModel[]>("http://localhost:8080/getCity", this.dane);   
  }*/
 

}
