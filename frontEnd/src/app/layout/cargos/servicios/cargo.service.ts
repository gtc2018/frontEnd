import { CargoModel } from './../../../model/cargo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';
import { EnterpriseModel } from '../../../model/enterprise';



@Injectable()
export class CargoService {
 
  userList: CargoModel[];
  cargo: CargoModel;
  enterprise: EnterpriseModel;

  constructor(private Http: HttpClient) { 
    this.cargo = new CargoModel();
    this.enterprise = new EnterpriseModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS CARGOS 
  public getCargos(): Observable<CargoModel[]>{
    return this.Http.get<CargoModel[]>("http://localhost:8080/getAllCargos");      
  } 

  //SERVICIO CONSULTAR CARGO POR ID
  public getCargoById(c): Observable<CargoModel>{
    return this.Http.post<CargoModel>("http://localhost:8080/getCargoById", c);   
  }
 
  //SERVICIO ACTUALIZAR CARGO
  public updateCargo(cargoId, estado){
    this.cargo.id = cargoId;
    return this.Http.post<CargoModel>("http://localhost:8080/updateCargo", JSON.stringify(this.cargo));   
  } 

  //SERVICIO ELIMINAR CARGO
  public deleteCargo(cargo){    
    this.cargo = cargo;
    return this.Http.post<CargoModel>("http://localhost:8080/deleteCargo", JSON.stringify(this.cargo));   
  }

  // SERVICIO CONSULTAR CARGOS POR ID DE EMPRESA
  public getChargeToEnterprise(id): Observable<CargoModel[]>{

    console.log(id);
  
    this.enterprise.id = id;
  
    return this.Http.post<CargoModel[]>("http://localhost:8080/getAllChargeToEnterprise", JSON.stringify(this.enterprise));      
  }

}
