import { LoginService } from './../../../login/servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { PermisoModel } from '../../../model/permiso.model';
import { AuthService } from '../../../shared/guard/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [LoginService]
})
export class SidebarComponent implements OnInit {

    constructor(private session: AuthService, private menu: LoginService) { }

    //Variables
    isActive: boolean = false;
    hideGroup1: boolean = false;
    hideGroup2: boolean = false;


    data = [];
    transacciones = [];
    basicas = [];
    menus: any;
    response: any;
    items: any;
    private permiso: PermisoModel;

    showMenu: string = '';
    icon: string = "fa-caret-left";
    iconG2: string = "fa-caret-left";

    eventGroup1() {

        this.hideGroup1 = !this.hideGroup1;

        if (this.hideGroup1 === true) {

            this.icon = "fa fa-caret-down";

        } else {

            this.icon = "fa fa-caret-left";

        }
    }

    eventGroup2() {

        this.hideGroup2 = !this.hideGroup2;

        if (this.hideGroup2 === true) {

            this.iconG2 = "fa fa-caret-down";

        } else {

            this.iconG2 = "fa fa-caret-left";

        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    //Metodo para cargar el menu dinamicamente:
    private getMenus(): void {
        this.permiso = new PermisoModel();
        this.permiso.rolId = this.session.authUser.rolId;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            //console.log(" ============MENUS=============== ");
            this.response = res;
            this.menus = res
            console.log(" ============data Response:=============== ");
            console.log(this.menus = res);
            for (let menu of this.menus) {

                if (menu.menu.parent === "0") {
                    console.log(" ============Menus:=============== ");
                    this.data.push(menu);
                    console.log(this.data);
                }

                if ((menu.menu.grupo === "7") && (menu.menu.parent === "1")) {
                    console.log(" ============Transacciones:=============== ");
                    this.transacciones.push(menu.menu);
                    console.log(this.transacciones);

                }

                if ((menu.menu.grupo === "8") && (menu.menu.parent === "1")) {
                    console.log(" ============Basicas:=============== ");
                    this.basicas.push(menu.menu);
                    console.log(this.basicas);

                }


            }


        }, (error) => {
            console.log(error);

        });
    }

    ngOnInit() {
        this.getMenus();

    }
}
