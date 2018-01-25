import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';






@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
   // providers:[UsuarioService]
})
export class LoginComponent {
    constructor() {

    }
    
    ngOnInit(){
        //console.log(this.loginService.user);
        
    }
    
   
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
