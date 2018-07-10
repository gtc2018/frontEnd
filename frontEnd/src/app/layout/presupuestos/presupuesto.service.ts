import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';
import { RestResponse } from '../../model/restResponse';
import { PresupuestoModel } from '../../model/presupuesto.model';


@Injectable()
export class PresupuestoService {
 
  presupuestos: PresupuestoModel[];
  presupuesto: PresupuestoModel;

  constructor(private Http: HttpClient) { 
    this.presupuesto = new PresupuestoModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS DOCUMENTOS
  public getAllPropuesta(): Observable<PresupuestoModel[]>{
    return this.Http.get<PresupuestoModel[]>("http://localhost:8080/getAllPropuesta");      
  } 

  //SERVICIO GUARDA UN DOCUMENTO
  public saveOrUpdate(presupuesto: PresupuestoModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdatePropuesta",JSON.stringify(presupuesto));
  }

  //SERVICIO BORRA UN DOCUMENTO
  public deletePropuesta(id): Observable<RestResponse> {
    this.presupuesto.id = id;
    return this.Http.post<RestResponse>("http://localhost:8080/deletePropuesta",JSON.stringify(this.presupuesto));
  }

  //SERVICIO CONSULTA LOS DOCUMENTOS DE UNA COTIZACION
  public getDocumentByQuotation(id): Observable<PresupuestoModel[]> {
    this.presupuesto.id = id;
    return this.Http.post<PresupuestoModel[]>("http://localhost:8080/getDocumentByQuotation",JSON.stringify(this.presupuesto));
  }

  //SERVICIO ABRIR UN DOCUMENTO
  public getOpenDocument(presupuesto: PresupuestoModel): Observable<RestResponse> {
    console.log(presupuesto);
    return this.Http.post<RestResponse>("http://localhost:8080/getOpenDocument",JSON.stringify(presupuesto));
  }


}
