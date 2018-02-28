import { UsuarioModel } from './../../../model/usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../../model/restResponse';



@Injectable()
export class UsuarioService {

  userList: UsuarioModel[];

  constructor(private Http: HttpClient) { }

  //SERVICIO CONSULTAR TODOS LOS USUARIOS
  public getUsuarios(): Observable<UsuarioModel[]>{

    return this.Http.get<UsuarioModel[]>("http://localhost:8080/getAllUsuarios");

  }

  public delete(usuario: UsuarioModel): Observable<RestResponse> {
    console.log(usuario);
    return this.Http.post<RestResponse>("http://localhost:8080/deleteUsuario", JSON.stringify(usuario));

  }

}
