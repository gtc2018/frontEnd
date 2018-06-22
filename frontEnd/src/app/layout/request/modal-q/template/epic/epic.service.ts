import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {EpicaModel} from '../../../../../model/epica.model';
import {EpicsxRequestModel} from '../../../../../model/epicsxRequest';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../../../../model/restResponse';
import { RequerimientoModel } from '../../../../../model/requerimiento.model';
import { ProyectoModel } from '../../../../../model/proyectos';


@Injectable()
export class EpicService {
  request: EpicaModel = new EpicaModel;
  involved: RequerimientoModel = new RequerimientoModel;
  proyecto: ProyectoModel = new ProyectoModel;
 

  constructor(private http: HttpClient) { }

  
   //SERVICIO CONSULTAR TODOS LOS Epicas que pertenecen al proyecto del requerimiento
   public getEpicas(idProyecto): Observable<EpicaModel[]>{
    this.proyecto.id=idProyecto;
    console.log(idProyecto);
    return this.http.post<EpicaModel[]>("http://localhost:8080/getAllEpicasProyecto", JSON.stringify(this.proyecto));      
  }

  public saveOrUpdate(request: EpicaModel): Observable<RestResponse> {
    console.log("REQUEST");
    console.log(request);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateEpica",JSON.stringify(request));
  }

  public saveEpicsxRequest(requestId, epicsxRequest: EpicsxRequestModel[]): Observable<any> {

    return this.http.post<any>("http://localhost:8080/EpicsXRequest",
    epicsxRequest,
      {
        params:{requestId:requestId}
      }
                              );
  }

  public getEpicasByRequerimiento(id): Observable<EpicaModel[]> {
    this.request.id=id;
    console.log(id);
    return this.http.post<EpicaModel[]>("http://localhost:8080/getAllEpicasRequerimiento", JSON.stringify(this.request));

  }


  /*
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

  //Obtener requerimientos por proyecto
  public getRequestByProject(id): Observable<RequerimientoModel[]> {
    this.proyecto.id=id;
    console.log(id);
    return this.http.post<RequerimientoModel[]>("http://localhost:8080/getAllRequestToProject", JSON.stringify(this.proyecto));

  }

  //Obtener requerimientos por proyecto y usuario
  public getRequestByProjectAndEmployee(id, id2): Observable<RequerimientoModel[]> {
    this.request.proyectoId= id;
    this.request.clienteId = id2;
    console.log(this.request);
    return this.http.post<RequerimientoModel[]>("http://localhost:8080/getRequestByProjectAndEmployee", JSON.stringify(this.request));

  }

  //Obtener requerimientos por fechas
  public getAllRequestToDate(request: RequerimientoModel): Observable<RequerimientoModel[]> {
    return this.http.post<RequerimientoModel[]>("http://localhost:8080/getAllRequestToDate", JSON.stringify(request));

  }

  public delete(request: RequerimientoModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/deleteRequerimiento", JSON.stringify(request) );

  }

  public cargarRequerimiento(id): Observable<RequerimientoModel>{
    this.request.id=id;
    return this.http.post<RequerimientoModel>("http://localhost:8080/getRequerimiento", JSON.stringify(this.request));
  }*/
}