import { PorcentajePorFaseModel } from './../../../model/porcentajePorFase.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';



@Injectable()
export class PorcentajePorFaseService {
 
  PorcentajePorFaseList: PorcentajePorFaseModel[];
  porcentajePorFase: PorcentajePorFaseModel;

  constructor(private Http: HttpClient) { 
    this.porcentajePorFase = new PorcentajePorFaseModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS PorcentajePorFase 
  public getPorcentajePorFases(): Observable<PorcentajePorFaseModel[]>{
    return this.Http.get<PorcentajePorFaseModel[]>("http://localhost:8080/getAllPorcentajePorFase");      
  }
  
  //SERVICIO CONSULTAR TODOS LOS PorcentajePorFase 
  public getPorcentajePorFaseForEnterprise(id): Observable<PorcentajePorFaseModel[]>{

    //this.porcentajePorFase.id = id;

    return this.Http.post<PorcentajePorFaseModel[]>("http://localhost:8080/getAllPorcentajeEmpresa", id);      
  }

  //SERVICIO CONSULTAR UN PorcentajePorFase BY ID
  public getPorcentajePorFaseById(p): Observable<PorcentajePorFaseModel>{
    return this.Http.post<PorcentajePorFaseModel>("http://localhost:8080/getPorcentajePorFasesById", p);   
  }
 
  //SERVICIO ACTUALIZAR UN PorcentajePorFase
  public updatePorcentajePorFase(porcentajePorFaseId, estado){
    this.porcentajePorFase.id = porcentajePorFaseId;
    return this.Http.post<PorcentajePorFaseModel>("http://localhost:8080/updatePorcentajePorFase", JSON.stringify(this.porcentajePorFase));   
  } 

  //SERVICIO ELIMINAR PorcentajePorFase
  public deletePorcentajePorFase(porcentajePorFase){    
    this.porcentajePorFase = porcentajePorFase;
    return this.Http.post<PorcentajePorFaseModel>("http://localhost:8080/deletePorcentajePorFase", JSON.stringify(this.porcentajePorFase));   
  }

  public getFasesxEmpresa(enterpriseId:number): Observable<PorcentajePorFaseModel[]>{
    // return this.Http.get<PorcentajePorFaseModel[]>("http://localhost:8080/PorcentajePorFase/getFasesxEmpresa/"+id+"/"+detailId);
    return this.Http.get<PorcentajePorFaseModel[]>("http://localhost:8080/PorcentajePorFase/getFasesxEmpresa/"+enterpriseId);

  }

  

}
