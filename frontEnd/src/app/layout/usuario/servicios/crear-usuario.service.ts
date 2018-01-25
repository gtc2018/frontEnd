import { UsuarioComponent } from './../usuario.component';
import { UsuarioModel } from './../../../model/usuario/usuario.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../../model/restResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrearUsuarioService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo de validaciones del formulario Usuarios.
   * @param usuario 
   */
  public validate(usuario: UsuarioModel): boolean {
    let isValid = true;
    
    if(!usuario.apellidos){
       isValid = false;
    }
    if(!usuario.email){
       isValid = false;
    }
    if(!usuario.telefono){
       isValid = false;
    }
    if(!usuario.rolId){
       isValid = false;
    }
    if(!usuario.password){
       isValid = false;
    }
    
    return isValid;
  }

  public saveOrUpdate(usuario: UsuarioModel): Observable<RestResponse> {

    return this.http.post<RestResponse>("http://localhost:8080/usuarioSaveOrUpdate", JSON.stringify(usuario));


  }

}
