import { Component, OnInit} from '@angular/core';
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
import { CotizacionModel } from '../../model/cotizacion.model';
import { EnterpriseModel } from '../../model/enterprise';
import { ProyectoModel } from '../../model/proyectos';
import { EstadoModel } from '../../model/estado.model';
import { FaseModel } from '../../model/fase';
//import {CreateRequestComponent} from './create-request/create-request.component';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    // styleUrls: ['./request.scss'],
    animations: [routerTransition()],
    providers: [RequestService, LoginService],
})


export class RequestComponent implements OnInit {

    //Variables

    crear = false;
    editar = false; 
    eliminar = false;
    leer = false;


    items: any;
    menus: any;

    requestForm: RequerimientoModel;
    filter: RequerimientoModel = new RequerimientoModel();//Filtro
    private requests: RequerimientoModel[];//Tabla
    private permiso: PermisoModel;

    

    //Funciones


    constructor(
            private requestService: RequestService, 
            private toastr: ToastrService,
            private login:AuthService,
            private menu: LoginService) {

                this.filter.cotizacion = new CotizacionModel();
                this.filter.cliente = new EnterpriseModel();
                this.filter.proyecto = new ProyectoModel();
                this.filter.estado =  new EstadoModel();
                this.filter.fase = new FaseModel();
                this.requestForm = new RequerimientoModel();
            }

    ngOnInit() {
        this.loadRequests();
        this.getItemsRequerimientos();
    }

    creationPage():void{
        console.log("dsads");
    }

    private loadRequests(): void {

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
            console.log("======================= PERMISOS REQUERIMIENTOS: ==============");
            console.log(this.menus = res);

            for (let menu of this.menus) {
                    //this.items = menu.item;
                if (menu.menu.descripcion === "Requerimientos") {
                    this.items = menu;

                    if (this.items.crear === 1) {
                        this.crear = true;
                    }

                    if (this.items.editar === 1) {
                        this.editar = true;
                    }

                    if (this.items.eliminar === 1) {
                        this.eliminar = true;
                    }

                    if (this.items.leer === 1) {
                        this.leer = true;
                    }

                }
            }
        }, (error) => {

            console.log(error);

        });
    }


    //Metodo delete: Recibe un requerimiento y lo elimina en la BD

    delete(model){

        if(this.login.authUser !== undefined){

            model.usuarioCreacion=this.login.authUser.usuarioId;
        }

        swal({
            title: 'Esta seguro?',
            text: "El registro eliminado no podrá ser recuperado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            if(result.value){

                this.requestService.delete(model).subscribe(res=>{
                    // if (res.responseCode == OK) {
                    this.loadRequests();//actualiza los datos que se visualizan en la tabla donde se muestran todos los requerimientos

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Requerimientos');

            
                    this.requestForm = new RequerimientoModel();

                },(error)=>{  console.log(error);
                        swal(
                            'Error al eliminar el registro',
                            error.error.message,
                            'error'
                        )
                    }
                )
            }
        })
    }


}
