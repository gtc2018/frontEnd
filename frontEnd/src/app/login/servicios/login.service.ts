import { LoginModel } from './../../model/login.model';
import { UsuarioModel } from './../../model/usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../../model/restResponse';
import { PermisoModel } from '../../model/permiso.model';


@Injectable()
export class LoginService  {

  
  constructor(private  http: HttpClient) { }

  

  /**
   * Metodo de validaciones del formulario Usuarios.
   * @param login 
   */


  
  public validateLogin(email, password): boolean {
    let isValid = true;
    
    if(!email){
       isValid = false;
    }
    if(!password){
       isValid = false;
    }
     
     return isValid;
  }


  public loginUsuario(login: LoginModel): Observable<UsuarioModel> {
    //console.log("================SERVICIO: ============= " + JSON.stringify(login));
    return this.http.post<UsuarioModel>("http://localhost:8080/loginUsuario", JSON.stringify(login));


  }

  //Sericio para cargar menú dinamicamente

  public loadMenus(permiso: PermisoModel): Observable<UsuarioModel> {
    console.log(JSON.stringify(permiso));
    //console.log("================SERVICIO: ============= " + this.http.post<UsuarioModel>("http://localhost:8080/getMenuSession", JSON.stringify("1")));
    return this.http.post<UsuarioModel>("http://localhost:8080/getMenuSession", JSON.stringify(permiso));


  }


}
