
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../model/restResponse';
import { ProyectoModel } from '../../model/proyectos';
import { UsuarioModel } from '../../model/usuario/usuario.model';
import { CotizacionModel } from '../../model/cotizacion.model';
import { SystemsxQuotationModel } from '../../model/systemsxQuotation';
import { ToolsxQuotationModel } from '../../model/toolsxQuotation';



@Injectable()
export class QuotationService {

    quotation: CotizacionModel = new CotizacionModel;

    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    quotations: CotizacionModel[];
  constructor(private Http: HttpClient) {

  }

  //SERVICIO CONSULTAR TODOS LOS proyectos
  public getQuotations(): Observable<CotizacionModel[]>{

    return this.Http.get<CotizacionModel[]>("http://localhost:8080/Quotations");

  }

  public getQuotation(id:number): Observable<CotizacionModel>{

    return this.Http.get<CotizacionModel>("http://localhost:8080/Quotations/getId/"+id);

  }

//   public getAllEmployeesToEmpresaId(id): Observable<EmployeeModel[]>{

//     this.enterprise.id=id;

//      console.log(this.enterprise);

//     return this.Http.post<EmployeeModel[]>("http://localhost:8080/getAllEmployeesToEnterprise", JSON.stringify(this.enterprise) );
//   }

  public saveOrUpdate(quotation: CotizacionModel): Observable<any> {
    console.log(quotation);
    return this.Http.post<any>("http://localhost:8080/Quotations/saveOrUpdate", JSON.stringify(quotation));
  }

  public delete(id:number): Observable<RestResponse> {
    // console.log(proyecto);
    return this.Http.delete<RestResponse>("http://localhost:8080/Quotations/Delete/"+id);

  }

  public getSystemsxQuotation(quotationId): Observable<SystemsxQuotationModel[]>{

    return this.Http.get<SystemsxQuotationModel[]>("http://localhost:8080/SystemsXQuotation",{params:{id:quotationId}});

  }

  public getToolsxQuotation(quotationId): Observable<ToolsxQuotationModel[]>{

    return this.Http.get<ToolsxQuotationModel[]>("http://localhost:8080/ToolsXQuotation",
    {
      params:{id:quotationId}
    }                    );

  }

  public saveSystemxQuotation(quotationId, systemsxQuotation: SystemsxQuotationModel[]): Observable<any> {

    return this.Http.post<any>("http://localhost:8080/SystemsXQuotation",
     systemsxQuotation,
      {
        params:{quotationId:quotationId}
      }
                              );
  }
  
}
