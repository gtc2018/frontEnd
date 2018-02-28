import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EnterpriseModel } from '../../model/enterprise';
import { tap, catchError } from 'rxjs/operators';
import { RestResponse } from '../../model/restResponse';



@Injectable()
export class EnterpriseService {
    emailRegex: RegExp;

  enterpriseList: EnterpriseModel[];

  constructor(private http: HttpClient) { }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getEnterprises(): Observable<EnterpriseModel[]>{

    return this.http.get<EnterpriseModel[]>("http://localhost:8080/getAllEmpresas")

  }
    /**
   * Metodo de validaciones del formulario Usuarios.
   * @param enterprise
   */
  public validate(enterprise: EnterpriseModel): boolean {
    let isValid = true;

    if(!enterprise.nombreContacto){
       isValid = false;
    }
    if(!enterprise.descripcion){
       isValid = false;
    }
    if(!enterprise.tipoEmpresa){
        isValid = false;
     }
     if(!enterprise.tipoDocumento){
        isValid = false;
     }
     if(!enterprise.email){

        isValid = false;


     }else{
        this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (this.emailRegex.test(enterprise.email)) {
            console.log("correcto");
          } else {
            console.log("incorrecto");
          }
     }
     if(!enterprise.numeroDocumento){
        isValid = false;
     }
    // if(!enterprise.rolId){
    //    isValid = false;
    // }
    // if(!enterprise.password){
    //    isValid = false;
    // }

    return isValid;
  }

  public saveOrUpdate(enterprise: EnterpriseModel): Observable<RestResponse> {
    console.log(enterprise);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateEmpresa", JSON.stringify(enterprise));
  }

  public delete(enterprise: EnterpriseModel): Observable<RestResponse> {
    console.log(enterprise);

    return this.http.post<RestResponse>("http://localhost:8080/deleteEmpresa", JSON.stringify(enterprise) );

  }

}
