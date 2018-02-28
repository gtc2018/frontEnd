import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';
import { Router } from '@angular/router';
import { OK } from '../../messages/httpstatus';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { AuthService } from '../../shared/guard/auth.service';

@Component({
    selector: 'app-enterprise',
    templateUrl: './enterprise.component.html',
    styleUrls: ['./enterprise.component.scss'],
    animations: [routerTransition()],
    providers: [EnterpriseService]
})
export class EnterpriseComponent implements OnInit {

    //  Inicializacion de Variables---------------------

    user: any;

    messageEmail: string;
    emailRegex: RegExp;

    ngOnInit() {
        this.loadEnterprises();
    }

    constructor(private enterpriseService: EnterpriseService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService
    ) {
            this.enterprise = new EnterpriseModel();

                // this.user = JSON.parse(sessionStorage.getItem("usuario"));

                if(this.login.authUser !== undefined){

                    console.log(this.login.authUser.usuarioId);

                }

        }

    //Manejo del Date

    modelDate: NgbDateStruct;

    date: Date;

    //Data
    private enterprises: EnterpriseModel[];//Tabla
    private enterprise: EnterpriseModel;//Form
    private isValid: boolean = true;
    private message: string = "";

    //Mostrar el crear o no

    visible = false;

    //Icono del boton

    icon: string= "fa fa-caret-left";

    //Manejo del Date//

    //Funciones--------------------------------

    //Para mostrar el crear o no

    createHide() {
        this.visible = !this.visible;

        if(this.visible === true){

            this.icon = "fa fa-caret-down";

        }else{

            this.icon= "fa fa-caret-left";

        }
    }

    //Para eliminar

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
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {

            this.enterpriseService.delete(model).subscribe(res=>{
                // if (res.responseCode == OK) {
                    this.loadEnterprises();

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empresas');

                    // swal(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )

            },(error)=>{  console.log(error);
                swal(
                    'Error al eliminar el registro',
                    error.error.message,
                    'error'
                  )
            }
            )
          })

    }

    //Para editar

    upload(model){

        this.enterprise = model;

        this.visible = true;

        this.icon= "fa fa-caret-down";
    }

    //Manejo del Date

    newStructure(date: NgbDateStruct): Date {
        return date ? new Date(Date.UTC(date.year, date.month, date.day)) : null;
      }

      //Para guardar o actualizar

    save():void{

        if(this.login.authUser !== undefined){
            this.enterprise.usuarioCreacion=this.login.authUser.usuarioId;
        }



        this.isValid = this.validate(this.enterprise);

        if (this.isValid) {

        if (this.enterprise.empresaId=== undefined){

            this.enterprise.empresaId="500557";

        }

        this.enterpriseService.saveOrUpdate(this.enterprise).subscribe(res => {
            // if (res.responseCode == OK) {
                this.loadEnterprises();
                this.enterprise = new EnterpriseModel();
                this.toastr.success('Transacción satisfactoria', 'Gestión de Empresas');
            // } else {
            //     this.message = res.message;
            //     this.isValid = false;
            //     console.log(this.message);
            // }
        },(error)=>{
            console.log(error);

                this.toastr.error("Error en la transacción");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });

    } else {
        console.log(this.messageEmail);
        if(!this.messageEmail){
            this.message= 'Los campos con * son obligatorios!';
        }else{
            this.message= this.messageEmail;
            this.messageEmail= undefined;
        }
    }


    }

    ajustModel():void{

        console.log(this.modelDate);

        this.enterprise.fechaCreacion = this.newStructure(this.modelDate).toString();
    }

    //Cambio de estado

    changeState(model){

        if(this.login.authUser !== undefined){

        model.usuarioCreacion=this.login.authUser.usuarioId;

        }

        if (model.estado === true){
            model.estado = 1;
        }else{
            model.estado = 0;
        }

        console.log(model);

        this.enterpriseService.saveOrUpdate(model).subscribe(res => {
            if (res.responseCode == OK) {
                this.loadEnterprises();
                this.toastr.success('Registro actualizado', 'Gestión de Empresas');
            } else {
                this.message = res.message;
            }
        },(error)=>{
            console.log(error);

            this.isValid = false;

            this.toastr.error("Error actualizar los datos");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });
    }

    private loadEnterprises(): void {
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;
            console.log(this.enterprises);
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });
    }

    //Validación de campos

    public validate(enterprise: EnterpriseModel): boolean {
        let isValid = true;
        console.log(enterprise.nombreContacto);
        if(!enterprise.nombreContacto){
           isValid = false;
        }
        if(!enterprise.descripcion){
           isValid = false;
        }
        if(!enterprise.tipoEmpresa){
            isValid = false;
         }
         if(!enterprise.tipoDocumento){
            isValid = false;
         }
         if(!enterprise.email){

            isValid = false;

            this.messageEmail = undefined;

         }else{
            this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (this.emailRegex.test(enterprise.email)) {
                console.log("correcto");
                this.messageEmail = undefined;
              } else {
                console.log("incorrecto");
                this.messageEmail = "Por favor digite un formato de email válido";
              }
         }
         if(!enterprise.numeroDocumento){
            isValid = false;
         }
        // if(!enterprise.rolId){
        //    isValid = false;
        // }
        // if(!enterprise.password){
        //    isValid = false;
        // }

        return isValid;
      }

    //Manejo del Date //


    //-----------------------------------


}
