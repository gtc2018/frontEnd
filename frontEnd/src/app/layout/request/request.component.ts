import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';
import { RequerimientoModel } from '../../model/requerimiento.model';

import { LoginService } from './../../login/servicios/login.service';
import { RequestService } from './request.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import { OK } from '../../messages/httpstatus';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/guard/auth.service';
import swal from 'sweetalert2';
import { PermisoModel } from '../../model/permiso.model';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    // styleUrls: ['./request.scss'],
    animations: [routerTransition()],
    providers: [RequestService, LoginService]
})


export class RequestComponent implements OnInit {

    //Variables

    crear = false;
    editar = false; 
    eliminar = false;
    leer = false;


    items: any;
    menus: any;

    filter: RequerimientoModel = new RequerimientoModel();//Filtro
    private requests: RequerimientoModel[];//Tabla
    private permiso: PermisoModel;

    

    //Funciones


    constructor(
            private requestService: RequestService, 
            private toastr: ToastrService,
            private login:AuthService,
            private menu: LoginService) {}

    ngOnInit() {
        this.loadEmployee();
        this.getItemsRequerimientos();
    }

    creationPage():void{
        console.log("dsads");
    }

    private loadEmployee(): void {

        this.requestService.getAll().subscribe(res => { //Utilizando el servicio
 
             this.requests = res;
 
             console.log(res);
             //console.log(this.externalEmployeeForm);
        
         },(error)=>{ //Controlando posible error
 
             console.log(error);
             this.toastr.error("Error al cargar los datos");
 
         });
     }

    private getItemsRequerimientos(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            console.log("======================= PERMISOS Empleados Externos: ==============");
            console.log(this.menus = res);

            for (let menu of this.menus) {
                    //this.items = menu.item;
                if (menu.menu.descripcion === "Empleados") {
                    this.items = menu;
                    console.log("===============ITEMS EMPRESAS:======================")
                    console.log(this.items);

                    if (this.items.crear === 1) {
                        this.crear = true;
                        console.log("==============CREAR: " + this.crear);
                    }

                    if (this.items.editar === 1) {
                        this.editar = true;
                        console.log("==============EDITAR: " + this.editar);
                    }

                    if (this.items.eliminar === 1) {
                        this.eliminar = true;
                        console.log("==============ELIMINAR: " + this.eliminar);
                    }

                    if (this.items.leer === 1) {
                        this.leer = true;
                        console.log("==============LEER: " + this.leer);
                    }

                }
            }
        }, (error) => {

            console.log(error);

        });
    }


}
