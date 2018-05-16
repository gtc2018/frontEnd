import { CargoModel } from './../../../model/cargo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class CargoService {
 
  userList: CargoModel[];
  cargo: CargoModel;

  constructor(private Http: HttpClient) { 
    this.cargo = new CargoModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS ROLES 
  public getCargos(): Observable<CargoModel[]>{
    return this.Http.get<CargoModel[]>("http://localhost:8080/getAllCargos");      
  } 

  //SERVICIO CONSULTAR UN ROL BY ID
  public getCargoById(c): Observable<CargoModel>{
    return this.Http.post<CargoModel>("http://localhost:8080/getCargoById", c);   
  }
 
  //SERVICIO CONSULTAR UN ROL BY ID
  public updateCargo(cargoId, estado){
    this.cargo.id = cargoId;
    return this.Http.post<CargoModel>("http://localhost:8080/updateCargo", JSON.stringify(this.cargo));   
  } 

  //SERVICIO ELIMINAR ROL BY ID
  public deleteCargo(cargo){    
    this.cargo = cargo;
    return this.Http.post<CargoModel>("http://localhost:8080/deleteCargo", JSON.stringify(this.cargo));   
  }

}
