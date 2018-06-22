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

  //SERVICIO CONSULTAR TODOS LOS EMPLEADOS EN INHOUSE
  public getInHouse(): Observable<InHouseModel[]>{
    return this.Http.get<InHouseModel[]>("http://localhost:8080/getAllInHouse");      
  } 

  //SERVICIO GUARDA UN REGISTRO INHOUSE
  public saveOrUpdate(inHouse: InHouseModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdateInHouse",JSON.stringify(inHouse));
  }

  //SERVICIO BORRA UN REGISTRO INHOUSE
  public deleteInHouse(inHouse: InHouseModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/deleteInHouse",JSON.stringify(inHouse));
  }

  //SERVICIO CONSULTA LOS REGISTRO DE UN EMPLEADO INHOUSE
  public getInHouseByEmployee(id): Observable<InHouseModel[]> {
    this.inHouse.id = id;
    return this.Http.post<InHouseModel[]>("http://localhost:8080/getInHouseByEmployee",JSON.stringify(this.inHouse));
  }

  //SERVICIO CONSULTA LOS REGISTRO DE UN EMPLEADO INHOUSE
  public getInHouseByDate(fecha1, fecha2): Observable<InHouseModel[]> {
    this.inHouse.desde = fecha1;
    this.inHouse.hasta = fecha2;
    return this.Http.post<InHouseModel[]>("http://localhost:8080/getInHouseByDate",JSON.stringify(this.inHouse));
  }

}
