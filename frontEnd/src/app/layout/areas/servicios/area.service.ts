import { AreaModel } from './../../../model/area.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';
import { EnterpriseModel } from '../../../model/enterprise';



@Injectable()
export class AreaService {
 
  userList: AreaModel[];
  area: AreaModel;
  enterprise: EnterpriseModel;

  constructor(private Http: HttpClient) { 
    this.area = new AreaModel();
    this.enterprise = new EnterpriseModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getAreas(): Observable<AreaModel[]>{
    return this.Http.get<AreaModel[]>("http://localhost:8080/getAllAreas");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getAreaById(c): Observable<AreaModel>{
    return this.Http.post<AreaModel>("http://localhost:8080/getAreaById", c);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateArea(area){
    this.area = area;
    return this.Http.post<AreaModel>("http://localhost:8080/updateArea", JSON.stringify(this.area));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteArea(area){    
    this.area = area;
    return this.Http.post<AreaModel>("http://localhost:8080/deleteArea", JSON.stringify(this.area));   
  }

  // SERVICIO CONSULTAR AREAS POR ID DE EMPRESA
  public getAreaToEnterprise(id): Observable<AreaModel[]>{

    console.log(id);
  
    this.enterprise.id = id;
  
    return this.Http.post<AreaModel[]>("http://localhost:8080/getAllAreasToEnterprise", JSON.stringify(this.enterprise));      
  }

}
