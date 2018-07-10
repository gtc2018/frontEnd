import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearSistemaService } from './servicios/crear-sistema.service';
import { Router } from '@angular/router';
import { SistemaModel } from '../../model/sistema.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SistemaService } from './servicios/sistema.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-sistema',  
    templateUrl: './sistema.component.html', 
    styleUrls: ['./sistema.component.scss'],
    animations: [routerTransition()],
    providers: [SistemaService, CrearSistemaService, LoginService] 
})
export class SistemaComponent implements OnInit {

    // Variables -----------------------------

    sistema: SistemaModel[];
    filter: SistemaModel = new SistemaModel();

    sistemaForm: SistemaModel;
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
        private sistemaService: SistemaService,
        private crearSistemaService: CrearSistemaService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.sistemaForm = new SistemaModel();

    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();
        this.loadSistemas(); 
    }    

    //Funciones --------------------------------------------

    //Cargar Sistemas

    private loadSistemas(): void {
        this.sistemaService.getSistemas().subscribe(res => {
            this.sistema = res;   

            },(error)=>{

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Sistema

    save():void{

        if(this.sistemaForm.id === null){
            this.sistemaForm.usuarioCreacion = localStorage.email;
        }else{
            this.sistemaForm.usuarioModificacion = localStorage.email;
        }

        this.isValid = this.validate(this.sistemaForm);

        if (this.isValid) {

            this.crearSistemaService.saveOrUpdate(this.sistemaForm).subscribe(res => {
                    this.sistemaForm = new SistemaModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Sistemas');
                    this.loadSistemas();
                    this.clean();

            },(error)=>{

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Sistemas');
            this.message = "Los campos con * son obligatorios.";
        }
    }

     // Eliminar Sistema
     delete(id) {

        if (id != null) {
            this.sistemaForm.id = id;
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
              
                this.sistemaForm.usuarioModificacion = localStorage.email;

            this.sistemaService.deleteSistema(this.sistemaForm).subscribe(res => {

                this.clean();
                this.loadSistemas();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {

            });       
                
            }
        })

    }

    //Validacion:

    public validate(sistemaForm: SistemaModel): boolean {
        let isValid = true;

        if (!sistemaForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.sistemaForm = model; 
        this.visible = true;
    }

    // Limpia los campos
    clean() {
        this.sistemaForm = new SistemaModel();
        this.deleteFormHide = false;
        this.visible = false;
    }

    //Permisos
    private getItems(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            console.log("======================= PERMISOS Empleados: ==============");

            console.log(this.menus = res);
            for (let menu of this.menus) {
                //this.items = menu.item;
                if (menu.menu.descripcion === "Sistemas") {
                    this.items = menu;
                    console.log(this.items);

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
}
