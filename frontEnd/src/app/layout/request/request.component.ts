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

    mes: string;
    dia: string;
    año: string;
    message: string;
    antFechI: string;
    antFechE: string;
    icon: string = "fa fa-caret-left";

    stateExpand: number = 1;
    cliente: number = null;

    private isValid: boolean = true;
    private isValidFechas: boolean = true;
    filtroFech: boolean = false;
    visible: boolean = false;
    deleteFormHide: boolean;

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
    }

    //Metodo para cargar los requerimientos
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

    //Se arma la fecha segun el query solicitado
    public formatoFecha(fecha): string {
        let fechaString ="";
        if(fecha['month'] < 10){
            this.mes = "0"+fecha['month'];
        }else{
            this.mes = fecha['month'];
    
        }
        if(fecha['day']< 10){
            this.dia = "0"+ fecha['day'];
        }else{
            this.dia = fecha['day'];
        }
    
        fechaString = fecha['year']+"-"+this.mes+"-"+this.dia;
        
        return fechaString;
    }

    //Cambiamos el formato de las fechas
    public formatoFechas(){

        if(this.requestForm.fechaInicio){
            this.requestForm.fechaInicio=this.formatoFecha(this.requestForm.fechaInicio);
         }
         if(this.requestForm.fechaEntrega){
            this.requestForm.fechaEntrega=this.formatoFecha(this.requestForm.fechaEntrega);
         }
    }

    //Metodo para consultar dentro de un rango de fechas
    loadRequestsForDate(): void{

        this.isValid = this.validate(this.requestForm);

        if(this.isValid){

            this.antFechI = this.requestForm.fechaInicio;
            this.antFechE = this.requestForm.fechaEntrega;

            this.formatoFechas();
            this.isValidFechas = this.validarFechas();

            if(this.isValidFechas){

                this.requestService.getAllRequestToDate(this.requestForm).subscribe(res => { 
 
                    if(res.length !== 0){
                        
                        this.requests = res;
                        this.gameDate();
                        this.filtroFech = true;

                    }else{
                        this.toastr.error("No existen registros en el rango", "Error en la transacción")
                        this.gameDate();
                    }
                },(error)=>{ 

                    this.toastr.error(error.error.message,"Error en la transacción");
                    this.gameDate();
        
                });
            }else{
                this.gameDate();
                this.toastr.error(this.message,"Error en la transacción");
                this.message = undefined;
            }

        }else{
            this.toastr.error(this.message,"Error en la transacción");
            this.message = undefined;
        }
        
    }

    // Se valida que los campos no esten vacios
    public validate(requestForm: RequerimientoModel): boolean {
    
        if(!requestForm.clienteId){
            this.message = "falto escoger por cual fecha filtrar";
            return false;
        }
        if(!requestForm.proyectoId){
            this.message = "falto escoger por cual fecha filtrar";
            return false;
        }
        if(!requestForm.fechaInicio){
            this.message = "falto seleccionar una fecha para filtrar";
            return false;
        }
        if(!requestForm.fechaEntrega){
            this.message = "falto seleccionar una fecha para filtrar";
            return false;
        }

        return true;
    }

    //Se valida que la fecha de inicio no sea mayor a la fin
    public validarFechas():boolean{
        let isValidFechas=true;
    
        
        if( parseInt(this.requestForm.fechaInicio.toString().substr(0,4)) > parseInt(this.requestForm.fechaEntrega.toString().substr(0,4))){
    
            this.message= 'el año de la primera fecha no puede ser mayor a la segunda';
            isValidFechas = false;
    
        }else if(parseInt(this.requestForm.fechaInicio.toString().substr(0,4)) === parseInt(this.requestForm.fechaEntrega.toString().substr(0,4))){
    
            if(parseInt(this.requestForm.fechaInicio.toString().substr(5,2)) > parseInt(this.requestForm.fechaEntrega.toString().substr(5,2))){
    
                this.message= 'el mes de la primera fecha no puede ser mayor a la segunda';
                isValidFechas = false;
    
            }else if(parseInt(this.requestForm.fechaInicio.toString().substr(5,2)) === parseInt(this.requestForm.fechaEntrega.toString().substr(5,2))){
    
                if(parseInt(this.requestForm.fechaInicio.toString().substr(8,2)) > parseInt(this.requestForm.fechaEntrega.toString().substr(8,2))){
    
                    this.message= 'el dia de la primera fecha no puede ser mayor a la segunda';
                    isValidFechas = false;
    
                }
            }
        }
           
        return isValidFechas
    }

    //Se regresan las fechas
    gameDate(): void{
        this.requestForm.fechaInicio = this.antFechI;
        this.requestForm.fechaEntrega = this.antFechE;
    }

    //limpiar todo
    clean(): void{
        this.filtroFech = false;
        this.loadRequests();
        this.requestForm = new RequerimientoModel;
    }

    //Mostrar el filtrar o no
    createHide() {

        if (this.stateExpand === 3) {

            this.stateExpand = 2;

            this.deleteFormHide = false;

        } else if (this.stateExpand === 1) {

            this.visible = !this.visible;

            if (this.visible === true) {

                this.icon = "fa fa-caret-down";
                this.toastr.warning('La primera fecha se usara para buscar si es igual o mayor a ella y la segunda fecha para buscar si es igual o menor', 'Gestion Requerimientos');

            } else {

                this.icon = "fa fa-caret-left";
                this.clean();

            }

            this.stateExpand = 2

        } else
            if (this.stateExpand === 2) {

                this.visible = !this.visible;


                if (this.visible === true) {

                    this.icon = "fa fa-caret-down";
                    this.toastr.warning('La primera fecha se usara para buscar si es igual o mayor a ella y la segunda fecha para buscar si es igual o menor', 'Gestion Requerimientos');

                } else {

                    this.icon = "fa fa-caret-left";
                    this.clean();

                }
                this.stateExpand = 1
            }
    }

}
