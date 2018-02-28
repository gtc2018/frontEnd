import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private user: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        
        if (this.user.getUserLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
    
       //return this.user.getUserLoggedIn();
    }
}
