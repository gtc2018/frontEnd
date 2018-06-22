import { LoginService } from './../../login/servicios/login.service';
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
import { PermisoModel } from '../../model/permiso.model';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalQComponent } from './modal-q/modal-q.component';
import { SystemComponent } from './modal-q/template/system/system';
import { ToolComponent } from './modal-q/template/tool/tool';
import { CreateDetailComponent } from './modal-q/template/create-detail/create-detail';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { PorcentajePorFaseModel } from '../../model/porcentajePorFase.model';

@Component({
    selector: 'app-enterprise',
    templateUrl: './enterprise.component.html',
    styleUrls: ['./enterprise.component.scss'],
    animations: [routerTransition()],
    providers: [
        EnterpriseService,
        LoginService
    ]
})
export class EnterpriseComponent implements OnInit {


    //  Inicializacion de Variables---------------------

    user: any;
    menus: any;
    imageTem: string;
    private permiso: PermisoModel;
    file: File = null;

    crear = false;
    editar = false;
    eliminar = false;
    leer = false;

    dragging: boolean;
    stateExpand: number = 1;
    deleteFormHide: boolean;
    public empresaId: Number;



    filter: EnterpriseModel = new EnterpriseModel();

    messageEmail: string;
    emailRegex: RegExp;

    systemInit: { id: number; name: string; value: boolean; }[];
    toolInit: { id: number; name: string; value: boolean; }[];

    modelDateDS;
    modelDateSol;
    modelDateEnt;

    closeResult: string;

    systemItem= [];


    toolItem= [];

    ngOnInit() {
        this.loadEnterprises();
        this.getItemsEmpresas();
    }

    constructor(private enterpriseService: EnterpriseService,
        private modalService: NgbModal,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService

    ) {
        this.enterprise = new EnterpriseModel();

        this.enterprise.imagenEmpresa = "assets/images/logo.png"

        // this.user = JSON.parse(sessionStorage.getItem("usuario"));

        this.toolInit= [
            {id:1,name:"Angular",value:false},
            {id:2, name:"ReactJs", value:true}
        ]
    
        this.systemInit=[
            {id:1, name:"As400",value:false},
            {id:2,name:"Mac", value:true},
            {id:3,name:"Windows", value:true}
        ]

        //Para agregarlos al xchips
    
        for (let r of this.systemInit){
    
            if (r.value === true){
    
                this.systemItem.push(r);
    
            }
    
        }
    
        for (let r of this.toolInit){
    
            if (r.value === true){
    
                this.toolItem.push(r);
    
            }
    
        }

        if (this.login.authUser !== undefined) {

            console.log(this.login.authUser.email);

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

    public empresa : EnterpriseModel;

    //Mostrar el crear o no

    visible = false;

    modal = false;

    //Icono del boton

    icon: string = "fa fa-caret-left";

    //Manejo del Date//

    //Funciones--------------------------------

    //Para eliminar desde el formulario
    deleteForm(model) {

        if (this.login.authUser !== undefined) {

            model.usuarioCreacion = this.login.authUser.email;
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

                if (result.value) {

                this.enterpriseService.delete(model).subscribe(res=>{
                    // if (res.responseCode == OK) {
                        this.clean();
                        this.loadEnterprises();

                        this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empresas');

                        // swal(
                        //     'Deleted!',
                        //     'Your file has been deleted.',
                        //     'success'
                        //   )
                        this.enterprise = new EnterpriseModel();
                        this.enterprise.imagenEmpresa = 'assets/images/logo.png';

                        this.deleteFormHide = false;

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

    //Cuando se limpia el formulario

    clean() {

        this.enterprise = new EnterpriseModel();

        this.deleteFormHide = false;

        this.enterprise.imagenEmpresa = 'assets/images/logo.png';

        this.modal = false;
    }

    //Para editar

    upload(model) {

        this.empresa = model;

        console.log(model);

        console.log(this.stateExpand);

        if (this.stateExpand === 1) {
            this.visible = !this.visible;

            if (this.visible === true) {
                this.icon = "fa fa-caret-down";

                this.deleteFormHide = false;
            } else {
                this.icon = "fa fa-caret-left";
            }
            this.deleteFormHide = true;

            this.enterprise = model;
            this.stateExpand = 3;

        } else if (this.stateExpand === 2 || this.stateExpand === 3) {
            this.enterprise = model;
            this.stateExpand = 3;
            this.deleteFormHide = true;
        }

        this.modal = true;

    }

    //Para mostrar el crear o no

    createHide() {

        console.log(this.stateExpand);

        if (this.stateExpand === 3) {

            this.enterprise = new EnterpriseModel();

            this.enterprise.imagenEmpresa = 'assets/images/logo.png';
            this.clean();

            this.stateExpand = 2;

            this.deleteFormHide = false;

        } else if (this.stateExpand === 1) {

            this.visible = !this.visible;

            if (this.visible === true) {

                this.icon = "fa fa-caret-down";
                this.clean();

            } else {

                this.icon = "fa fa-caret-left";

            }

            this.stateExpand = 2

            // this.stateExpand = true;
        } else
            if (this.stateExpand === 2) {

                this.visible = !this.visible;


                if (this.visible === true) {

                    this.icon = "fa fa-caret-down";
                    this.clean();

                } else {

                    this.icon = "fa fa-caret-left";

                }
                this.stateExpand = 1
            }
    }

    // Mostrar el modal o no
    createPorcentaje() {

        const modalRef = this.modalService.open(ModalQComponent,{size:"lg"});
        modalRef.componentInstance.title = 'Asignar Porcentaje por Fase';
        // modalRef.componentInstance.seleccionados = 'las herramientas';
        modalRef.componentInstance.template = `create-detail`;
        modalRef.componentInstance.empresaId = this.empresa.id;


       this.empresaId = parseFloat(this.empresa.empresaId);
       console.log(this.empresaId);

        
    }

    //Para eliminar

    delete(model) {

        if (this.login.authUser !== undefined) {

            model.usuarioCreacion = this.login.authUser.email;
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

            if (result.value) {

            this.enterpriseService.delete(model).subscribe(res=>{
                // if (res.responseCode == OK) {
                this.clean();
                this.loadEnterprises();

                this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empresas');

                // swal(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                //   )

                this.enterprise = new EnterpriseModel();
                this.enterprise.imagenEmpresa = 'assets/images/logo.png';

                this.deleteFormHide = false;

            }, (error) => {
                console.log(error);
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



    //Manejo del Date

    newStructure(date: NgbDateStruct): Date {
        return date ? new Date(Date.UTC(date.year, date.month, date.day)) : null;
    }

    //Para guardar o actualizar

    save(): void {

        if (this.login.authUser !== undefined) {
            if(this.enterprise.id === null){
                this.enterprise.usuarioCreacion = this.login.authUser.email;
                
            }else {
                this.enterprise.usuarioModificacion = this.login.authUser.email;
            }
            
        }

        this.isValid = this.validate(this.enterprise);

        if (this.isValid) {

            if(this.file !==null && this.file.name !==null){
            this.enterprise.imagenEmpresa = this.file.name;
            }
            this.enterprise.estado = 1;
            this.enterpriseService.saveOrUpdate(this.enterprise).subscribe(res => {
                // if (res.responseCode == OK) {
                this.clean();
                this.loadEnterprises();
                this.enterprise = new EnterpriseModel();
                this.enterprise.imagenEmpresa = 'assets/images/logo.png';
                this.toastr.success('Transacción satisfactoria, ya puede agregar los porcentajes por fase en editar', 'Gestión de Empresas');
                // } else {
                //     this.message = res.message;
                //     this.isValid = false;
                //     console.log(this.message);
                // }
            }, (error) => {
                console.log(error);

                this.toastr.error(error.error.message, "Error en la transacción");
                // swal(
                //     'Error',
                //     error.error.message,
                //     'error'
                //   )
            });

        } else {
            console.log(this.messageEmail);
            if (!this.messageEmail) {
                this.message = 'Los campos con * son obligatorios!';
            } else {
                this.message = this.messageEmail;
                this.messageEmail = undefined;
            }
        }

    }

    ajustModel(): void {

        console.log(this.modelDate);

        this.enterprise.fechaCreacion = this.newStructure(this.modelDate).toString();
    }

    //Cambio de estado

    changeState(model) {

        if (this.login.authUser !== undefined) {

            model.usuarioCreacion = this.login.authUser.email;

        }

        if (model.estado === true) {
            model.estado = 1;
        } else {
            model.estado = 0;
        }

        console.log(model);

        this.enterpriseService.saveOrUpdate(model).subscribe(res => {
            if (res.responseCode == OK) {
                this.clean();
                this.loadEnterprises();
                this.toastr.success('Registro actualizado', 'Gestión de Empresas');
            } else {
                this.message = res.message;
            }
        }, (error) => {
            console.log(error);

            this.isValid = false;

            this.toastr.error(error.error.message, "Error actualizar los datos");
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
        }, (error) => {
            console.log(error);

            this.toastr.error("Error al cargar los datos");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });
    }


    //
    private getItemsEmpresas(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            console.log("======================= PERMISOS Empresas: ==============");

            console.log(this.menus = res);
            for (let menu of this.menus) {
                //this.items = menu.item;
                if (menu.menu.descripcion === "Empresas") {

                    console.log("===============ITEMS EMPRESAS:======================")
                    console.log(menu);

                    if (menu.crear === 1) {
                        this.crear = true;
                    }

                    if (menu.editar === 1) {
                        this.editar = true;
                    }

                    if (menu.eliminar === 1) {
                        this.eliminar = true;
                    }

                    if (menu.leer === 1) {
                        this.leer = true;
                    }

                }




            }


        }, (error) => {
            console.log(error);

        });
    }

    //Validación de campos

    public validate(enterprise: EnterpriseModel): boolean {
        let isValid = true;
        console.log(enterprise.nombreContacto);
        if (!enterprise.nombreContacto) {
            isValid = false;
        }
        if (!enterprise.descripcion) {
            isValid = false;
        }
        if (!enterprise.tipoCliente) {
            isValid = false;
        }
        if (!enterprise.tipoDocumento) {
            isValid = false;
        }
        if (!enterprise.email) {

            isValid = false;

            this.messageEmail = undefined;

        } else {
            this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (this.emailRegex.test(enterprise.email)) {
                console.log("correcto");
                this.messageEmail = undefined;
            } else {
                isValid = false;
                console.log("incorrecto");
                this.messageEmail = "Por favor digite un formato de email válido";
            }
        }
        if (!enterprise.numeroDocumento) {
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


    // Para cargar el logo

    handleDragEnter() {
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    handleInputChange(e) {
        this.file = <File>e.target.files[0];
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        console.log(file);

        var pattern = /image-*/;
        var reader = new FileReader();
        console.log(reader);

        if (!file.type.match(pattern)) {
            swal(
                'Error al cargar logo',
                'Por favor ingrese un formato válido de imagen',
                'error'
            );
            return;
        }

        // this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        var reader = e.target;
        this.enterprise.imagenEmpresa = reader.result;
        this.imageTem = reader.result;
        this.enterprise.imagen = this.imageTem.split(/,(.+)/)[1];
        console.log(this.enterprise.imagen);
    }

    system() {
        const modalRef = this.modalService.open(ModalQComponent);
        modalRef.componentInstance.title = 'Sistemas';
        modalRef.componentInstance.seleccionados = 'los sistemas';
        modalRef.componentInstance.template = `system`;
    
        console.log(this.systemItem);
    
        let instance = modalRef.componentInstance;
    
        instance.array =  this.systemInit;
    
        modalRef.result.then( (result) => {
    
            this.systemItem=[];
    
            for (let r of result){
    
                if (r.value === true){
    
                    this.systemItem.push(r);
    
                }
    
            }
    
          }, (reason) => {
    
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log("dissmissed");
    
          });
    
      }
    
      tools() {
        const modalRef = this.modalService.open(ModalQComponent);
        modalRef.componentInstance.title = 'Herramientas';
        modalRef.componentInstance.seleccionados = 'las herramientas';
        modalRef.componentInstance.template = `tool`;
    
        let instance = modalRef.componentInstance;
    
        instance.array =  this.toolInit;
    
        modalRef.result.then( (result) => {
    
            this.toolItem=[];
    
            for (let r of result){
    
                if (r.value === true){
    
                    this.toolItem.push(r);
    
                }
    
            }
    
            }, (reason) => {
    
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("dissmissed");
    
    
             });
    
      }
    
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
