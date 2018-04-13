import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/guard/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';

    ngOnInit() {

        console.log("ssdsd");

    }

    isToggled(): boolean {
        console.log("cerrado");
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        console.log("abierto");
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        console.log("otro");
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        console.log(localStorage);
        localStorage.clear();
        console.log(localStorage);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    constructor(private translate: TranslateService,
        public router: Router,
       private login:AuthService) {

           console.log(localStorage);

           console.log(this.login);


       this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
       this.translate.setDefaultLang('en');
       const browserLang = this.translate.getBrowserLang();
       this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

       this.router.events.subscribe(val => {
        if (
            val instanceof NavigationEnd &&
            window.innerWidth <= 992 &&
            this.isToggled()
        ) {
            this.toggleSidebar();
        }
    });












   }








}
