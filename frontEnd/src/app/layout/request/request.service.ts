import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {RequerimientoModel} from '../../model/requerimiento.model';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';
import { CotizacionModel } from '../../model/cotizacion.model';
import { ProyectoModel } from '../../model/proyectos';
import { EstadoModel } from './../../model/estado.model';
import { InvolucradoModel } from '../../model/involucrado.model';




@Injectable()
export class RequestService {
  request: RequerimientoModel = new RequerimientoModel;
  involved: InvolucradoModel = new InvolucradoModel;
  proyecto: ProyectoModel = new ProyectoModel;
  estadoList: EstadoModel[];
 

  constructor(private http: HttpClient) { }

   //SERVICIO CONSULTAR TODOS LOS Requerimientos
   public getAll(): Observable<RequerimientoModel[]>{
    return this.http.get<RequerimientoModel[]>("http://localhost:8080/getAllRequerimiento");      
  }

  //SERVICIO CONSULTAR TODOS LOS Involucrados
  public getAllInvolved(): Observable<InvolucradoModel[]>{
    return this.http.get<InvolucradoModel[]>("http://localhost:8080/getAllInvolucrado");      
  }

  //SERVICIO CONSULTAR TODOS LOS INVOLUCRADOS DE UN REQUERIMIENTO
  public getInvolvedByRequest(id): Observable<InvolucradoModel[]>{
    this.involved.id = id;
    console.log(this.involved);
    return this.http.post<InvolucradoModel[]>("http://localhost:8080/getInvolvedByRequest",JSON.stringify(this.involved));      
  }

  public saveOrUpdate(request: RequerimientoModel): Observable<RestResponse> {
    console.log("REQUEST");
    console.log(request);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateRequerimiento",JSON.stringify(request));
  }

  //Servicio para guardar los involucrados
  public saveOrUpdateInvolved(involved: InvolucradoModel): Observable<RestResponse> {
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateInvolucrado",JSON.stringify(involved));
  }

    //Este servicio se debe pasara cuando se cree la carpeta de cotizaciones
  public getCotizacionByProyecto(id): Observable<CotizacionModel[]> {
    this.proyecto.id=id;
    console.log(id);
    return this.http.post<CotizacionModel[]>("http://localhost:8080/getCotizacionByProyecto", JSON.stringify(this.proyecto));

  } 

  public getEstados(): Observable<EstadoModel[]>{
    return this.http.get<EstadoModel[]>("http://localhost:8080/getAllEstados");      
  } 

  public getRequestByProject(id): Observable<RequerimientoModel[]> {
    this.proyecto.id=id;
    console.log(id);
    return this.http.post<RequerimientoModel[]>("http://localhost:8080/getAllRequestToProject", JSON.stringify(this.proyecto));

  }
  public delete(request: RequerimientoModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/deleteRequerimiento", JSON.stringify(request) );

  }

  public cargarRequerimiento(id): Observable<RequerimientoModel>{
    this.request.id=id;
    return this.http.post<RequerimientoModel>("http://localhost:8080/getRequerimiento", JSON.stringify(this.request));
  }
}