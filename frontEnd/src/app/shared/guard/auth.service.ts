import { LoginComponent } from './../../login/login.component';
import { UsuarioModel } from './../../model/usuario/usuario.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  private isUserLoggedin;
  public  authUser: UsuarioModel;

  constructor() {
    this.isUserLoggedin = false;
  }

  setUserLoggedIn(){
    //this.authUser = new UsuarioModel;
    this.isUserLoggedin = true;
    //Convierto los datos del usuario a un modelo usuario.
    this.authUser as UsuarioModel;
  }

  getUserLoggedIn(){
    return this.isUserLoggedin;
  }

}
