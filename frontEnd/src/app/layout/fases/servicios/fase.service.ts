import { RestResponse } from './../../../model/restResponse';
import { FaseModel } from './../../../model/fase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class FaseService {
 
  

  constructor(private Http: HttpClient) {
     // this.fase = new FaseModel();
   }

  //SERVICIO CONSULTAR TODOS LOS MENUS 
  public getFases(): Observable<FaseModel[]>{
    return this.Http.get<FaseModel[]>("http://localhost:8080/fases/getAll");   
  }

  public saveOrUpdate(fase: FaseModel): Observable<RestResponse> {
    console.log(fase);
    return this.Http.post<RestResponse>("http://localhost:8080/fase/create", JSON.stringify(fase));
  }

  /*
  //SERVICIO CONSULTAR MENU BY ID
  public getMenuById(c): Observable<MenusModel>{
    return this.Http.post<MenusModel>("http://localhost:8080/getMenuById", c);   
  }
 */
  //SERVICIO ELIMINAR MENUS BY ID
  public deleteFase(fase){
    
    return this.Http.post<FaseModel>("http://localhost:8080/fase/delete", JSON.stringify(fase));   
  }
  

}
