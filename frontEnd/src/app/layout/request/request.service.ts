import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {RequerimientoModel} from '../../model/requerimiento.model';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';
import { CotizacionModel } from '../../model/cotizacion.model';
import { ProyectoModel } from '../../model/proyectos';
import { EstadoModel } from './../../model/estado.model';




@Injectable()
export class RequestService {
  request: RequerimientoModel = new RequerimientoModel;
  proyecto: ProyectoModel = new ProyectoModel;
  estadoList: EstadoModel[];
 

  constructor(private http: HttpClient) { }

   //SERVICIO CONSULTAR TODOS LOS Requerimientos
   public getAll(): Observable<RequerimientoModel[]>{
    return this.http.get<RequerimientoModel[]>("http://localhost:8080/getAllRequerimiento");      
  }

  public saveOrUpdate(request: RequerimientoModel): Observable<RestResponse> {
    console.log("REQUEST");
    console.log(request);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateRequerimiento",JSON.stringify(request));
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


  public delete(request: RequerimientoModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/deleteRequerimiento", JSON.stringify(request) );

  }

  public cargarRequerimiento(id): Observable<RequerimientoModel>{
    this.request.id=id;
    return this.http.post<RequerimientoModel>("http://localhost:8080/getRequerimiento", JSON.stringify(this.request));
  }
}