import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Options } from 'selenium-webdriver/chrome';
import { HttpParams } from '@angular/common/http/src/params';
import { RestResponse } from '../../model/restResponse';
import { DocumentoProyectoModel } from '../../model/documentoProyecto.model';


@Injectable()
export class DocumentoProyectoService {
 
  documentos: DocumentoProyectoModel[];
  documento: DocumentoProyectoModel;

  constructor(private Http: HttpClient) { 
    this.documento = new DocumentoProyectoModel();
  } 

  //SERVICIO CONSULTAR TODOS LOS DOCUMENTOS
  public getAllDocumentos(): Observable<DocumentoProyectoModel[]>{
    return this.Http.get<DocumentoProyectoModel[]>("http://localhost:8080/getAllDocumentoProyecto");      
  } 

  //SERVICIO GUARDA UN DOCUMENTO
  public saveOrUpdate(documento: DocumentoProyectoModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/saveOrUpdateDocumentoProyecto",JSON.stringify(documento));
  }

  //SERVICIO BORRA UN DOCUMENTO
  public deleteDocumento(id): Observable<RestResponse> {
    this.documento.id = id;
    return this.Http.post<RestResponse>("http://localhost:8080/deleteDocumentoProyecto",JSON.stringify(this.documento));
  }

  //SERVICIO CONSULTA LOS DOCUMENTOS DE UN PROYECTO
  public getDocumentByProject(id): Observable<DocumentoProyectoModel[]> {
    this.documento.id = id;
    return this.Http.post<DocumentoProyectoModel[]>("http://localhost:8080/getDocumentByProject",JSON.stringify(this.documento));
  }

  //SERVICIO ABRIR UN DOCUMENTO
  public getOpenDocument(presupuesto: DocumentoProyectoModel): Observable<RestResponse> {
    return this.Http.post<RestResponse>("http://localhost:8080/getOpenDocument",JSON.stringify(presupuesto));
  }


}
