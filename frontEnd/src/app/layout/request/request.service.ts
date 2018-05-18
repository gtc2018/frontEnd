import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {request} from '../../model/request';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';



@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

   //SERVICIO CONSULTAR TODOS LOS Requerimientos
   public getAll(): Observable<request[]>{
    return this.http.get<request[]>("http://localhost:8080/getAllRequerimiento");      
  }

  public saveOrUpdate(request: request): Observable<RestResponse> {
    console.log(request);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateRequerimiento", request);
  }
}