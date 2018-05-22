import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearEstadoService } from './servicios/crear-estado.service';
import { Router } from '@angular/router';
import { EstadoModel } from '../../model/estado.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { EstadoService } from './servicios/estado.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-estado',  
    templateUrl: './estado.component.html', 
    styleUrls: ['./estado.component.scss'],
    animations: [routerTransition()],
    providers: [EstadoService, CrearEstadoService, LoginService] 
})
export class EstadoComponent implements OnInit {

    // Variables -----------------------------

    estado: EstadoModel[];
    filter: EstadoModel = new EstadoModel();

    estadoForm: EstadoModel;
    private permiso: PermisoModel;

    message: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';

    stateExpand: number = 1;

    user: any;
    items: any;
    menus: any;

    emailRegex: RegExp;

    crear = false;
    editar = false;
    eliminar = false;
    leer = false;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;
    private isValid: boolean = true;

    // Metodos principales----------------------------------------------------
    constructor(
        private estadoService: EstadoService,
        private crearEstadoService: CrearEstadoService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.estadoForm = new EstadoModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);
    
        }
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.loadEstados(); 
    }    

    //Funciones --------------------------------------------

    //Cargar Estados

    private loadEstados(): void {
        this.estadoService.getEstados().subscribe(res => {
            this.estado = res;   

            },(error)=>{

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Estado

    save():void{

        if(this.login.authUser !== undefined){
            if(this.estadoForm.id === null){
                this.estadoForm.usuarioCreacion = this.login.authUser.email.toString();
            }else{
                this.estadoForm.usuarioModificacion = this.login.authUser.email.toString();
            }
        }

        this.isValid = this.validate(this.estadoForm);

        if (this.isValid) {

            this.crearEstadoService.saveOrUpdate(this.estadoForm).subscribe(res => {
                    this.estadoForm = new EstadoModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Estados');
                    this.loadEstados();

            },(error)=>{

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Estados');
            this.message = "Los campos con * son obligatorios.";
        }
    }

     // Eliminar Cargo
     delete(id) {

        if (id != null) {
            this.estadoForm.id = id;
        }

        swal({
            title: 'Esta seguro?',
            text: "El registro eliminado no podrá ser recuperado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {

            if (result.value) {
              
                this.estadoForm.usuarioModificacion = this.login.authUser.email.toString();


            this.estadoService.deleteEstado(this.estadoForm).subscribe(res => {

                this.loadEstados();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {
                console.log(error);

            });       
                
            }
        })

    }

    //Validacion:

    public validate(estadoForm: EstadoModel): boolean {
        let isValid = true;

        if (!estadoForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.estadoForm = model; 
        this.visible = true;
    }

    // Limpia los campos
    clean() {
        this.estadoForm = new EstadoModel();
        this.deleteFormHide = false;
        this.visible = false;
    }
}
