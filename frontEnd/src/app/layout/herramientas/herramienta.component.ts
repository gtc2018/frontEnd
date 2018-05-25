import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearHerramientaService } from './servicios/crear-herramienta.service';
import { Router } from '@angular/router';
import { HerramientaModel } from '../../model/herramienta.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HerramientaService } from './servicios/herramienta.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-herramienta',  
    templateUrl: './herramienta.component.html', 
    styleUrls: ['./herramienta.component.scss'],
    animations: [routerTransition()],
    providers: [HerramientaService, CrearHerramientaService, LoginService] 
})
export class HerramientaComponent implements OnInit {

    // Variables -----------------------------

    herramienta: HerramientaModel[];
    filter: HerramientaModel = new HerramientaModel();

    herramientaForm: HerramientaModel;
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
        private herramientaService: HerramientaService,
        private crearHerramientaService: CrearHerramientaService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.herramientaForm = new HerramientaModel();

        if(this.login.authUser !== undefined){
    
        }

    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();
        this.loadHerramientas(); 
    }    

    //Funciones --------------------------------------------

    //Cargar Herramientas

    private loadHerramientas(): void {
        this.herramientaService.getHerramientas().subscribe(res => {
            this.herramienta = res;   

            },(error)=>{

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Herramienta

    save():void{

        console.log(this.login.authUser);

        if(this.login.authUser !== undefined){
            if(this.herramientaForm.id === null){
                this.herramientaForm.usuarioCreacion = this.login.authUser.email.toString();
            }else{
                this.herramientaForm.usuarioModificacion = this.login.authUser.email.toString();
            }
        }

        this.isValid = this.validate(this.herramientaForm);

        if (this.isValid) {

            this.crearHerramientaService.saveOrUpdate(this.herramientaForm).subscribe(res => {
                    this.herramientaForm = new HerramientaModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Herramientas');
                    this.loadHerramientas();
                    this.clean();

            },(error)=>{

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Herramientas');
            this.message = "Los campos con * son obligatorios.";
        }
    }

     // Eliminar Herramienta
     delete(id) {

        if (id != null) {
            this.herramientaForm.id = id;
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
              
                this.herramientaForm.usuarioModificacion = this.login.authUser.email.toString();

            this.herramientaService.deleteHerramienta(this.herramientaForm).subscribe(res => {

                this.loadHerramientas();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {

            });       
                
            }
        })

    }

    //Validacion:

    public validate(herramientaForm: HerramientaModel): boolean {
        let isValid = true;

        if (!herramientaForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.herramientaForm = model; 
        this.visible = true;
    }

    // Limpia los campos
    clean() {
        this.herramientaForm = new HerramientaModel();
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
                if (menu.menu.descripcion === "Herramientas") {
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
