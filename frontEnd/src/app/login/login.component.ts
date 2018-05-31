import { AuthService } from './../shared/guard/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ToastrService } from 'ngx-toastr';

import { LoginModel } from './../model/login.model';
import { UsuarioModel } from './../model/usuario/usuario.model';
import { OK } from './../messages/httpstatus';
import { LoginService } from './servicios/login.service';




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers: [LoginService]
})
export class LoginComponent {
    constructor(private router: Router, private loginService: LoginService, private user: AuthService) {

        console.log(localStorage);

    }

    private login: LoginModel;
    private usuario: UsuarioModel;
    private isValid: boolean = true;
    private message: string = "";
    private estado: number = 0;

    ngOnInit() {

    }
    /**
     *
     * @param form Metodo validar login:
     */
    public validateUsuario(form: NgForm): void {
        //Validacion Ok
        this.isValid = this.loginService.validateLogin(form.value.email, form.value.password);

        if (this.isValid) {

            //Inicializo el modelo login.
            this.login = new LoginModel();

            //asigno los parametros usaurio y contraseña que he recibido del formularia al modelo.
            this.login.email = form.value.email;
            this.login.password = form.value.password;

            //Invoco el método loginUsuario pasandole como parametro el modelo Login el cual contiene el usuario y contraseña ingresado en el formulario Login.
            this.loginService.loginUsuario(this.login).subscribe(res => {

                if (res) {
                        //this.user.authUser = new UsuarioModel;
                    console.log("=========== USUARIO: ===================");
                    console.log(this.usuario = res as UsuarioModel);

                    console.log(res);

                    this.user.authUser = res as UsuarioModel;
                    this.user.setUserLoggedIn();

                    localStorage.user = res.empleado.nombres;

                    localStorage.rol = res.rolId;
                    // res.rolId;

                    localStorage.email = res.empleado.email;

                    localStorage.userId = res.usuarioId;

                    localStorage.empleado = res.empleadoId;

                    localStorage.area = res.empleado.area.id;

                    return this.router.navigate(['/dashboard']);

                } else {

                    this.message = "Usuario o contraseña inválida";
                    this.isValid = false;

                    return this.router.navigate(['/login']);

                }

            },(error) => {
                console.log(error);
                this.message = error.error.message;
                this.isValid = false;

                    return this.router.navigate(['/login']);
            });

        } else {
            this.message = "Usuario y Contraseña no deben estar vacios";
        }

    }



    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');

    }
}
