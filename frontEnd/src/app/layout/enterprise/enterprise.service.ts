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
  enterprise: EnterpriseModel;

  constructor(private http: HttpClient) {
    this.enterprise = new EnterpriseModel;
   }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getEnterprises(): Observable<EnterpriseModel[]>{

    return this.http.get<EnterpriseModel[]>("http://localhost:8080/getAllEmpresas")

  }
    /**
   * Metodo de validaciones del formulario Usuarios.
   * @param enterprise
   */

  public saveOrUpdate(enterprise: EnterpriseModel): Observable<RestResponse> {
    console.log(enterprise);
    return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdateEmpresa", JSON.stringify(enterprise));
  }

  public getEnterpriseForRegistre(documento): Observable<EnterpriseModel[]> {

    this.enterprise.numeroDocumento = documento;
  
    return this.http.post<EnterpriseModel[]>("http://localhost:8080/getEnterpriseForRegistre", JSON.stringify(this.enterprise));
  }

  public delete(enterprise: EnterpriseModel): Observable<RestResponse> {
    console.log(enterprise);

    return this.http.post<RestResponse>("http://localhost:8080/deleteEmpresa", JSON.stringify(enterprise) );

  }

}
