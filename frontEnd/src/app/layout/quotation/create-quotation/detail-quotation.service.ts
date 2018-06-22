
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DetalleCotizacionModel } from '../../../model/detalleCotizacion';
import { FasesxDetalleCotizacionModel } from '../../../model/FasesxDetalleCotizacion';

@Injectable()
export class DetailQuotationService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

    //Modelos
    detallesCotizacion :DetalleCotizacionModel[];
    detalleCotizacion :DetalleCotizacionModel;

    fasesxDetalleCotizacion: FasesxDetalleCotizacionModel[];
    fasexDetalleCotizacion: FasesxDetalleCotizacionModel;


  constructor(private Http: HttpClient) {

  }

  public getDetailsQuotation(quotationId): Observable<DetalleCotizacionModel[]>{

    return this.Http.get<DetalleCotizacionModel[]>("http://localhost:8080/DetailQuotation",
    {
      params:{
        id:quotationId
             }
    }
  );

  }

  //Servicio para consultar todos los registros de las fases x empresa sacado de la tabla Porcentaje por fase
  public getFasesxDetalleCotizacion(id): Observable<FasesxDetalleCotizacionModel[]>{

    return this.Http.get<FasesxDetalleCotizacionModel[]>("http://localhost:8080/FasesxDetalleCotizacion",
    {
      params:{
        id:id
      }
    }
  );

  }

  public getDetailQuotation(id): Observable<DetalleCotizacionModel>{

    return this.Http.get<DetalleCotizacionModel>("http://localhost:8080/DetailQuotation/"+id,
    {
      params:{
        id:id
             }
    }
  );

  }

  public saveOrUpdateDetailQuotation(detalleCotizacion: DetalleCotizacionModel): Observable<any> {

    return this.Http.post<any>("http://localhost:8080/DetailQuotation", detalleCotizacion);

  }

  public saveOrUpdateFasexDetalleCotizacion(fasexDetalleCotizacion: FasesxDetalleCotizacionModel): Observable<any> {

    return this.Http.post<any>("http://localhost:8080/FasesxDetalleCotizacion", fasexDetalleCotizacion);

  }

  public deleteFasexDetalleCotizacion(id:number): Observable<any> {
    // console.log(proyecto);
    return this.Http.delete<any>("http://localhost:8080/FasesxDetalleCotizacion/"+id);

  }

  public deleteDetailQuotation(id:number): Observable<any> {
    // console.log(proyecto);
    return this.Http.delete<any>("http://localhost:8080/DetailQuotation/"+id);

  }
  
}