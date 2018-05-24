import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearTareaService } from './servicios/crear-tarea.service';
import { Router } from '@angular/router';
import { TareaModel } from '../../model/tarea.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TareaService } from './servicios/tarea.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';
import { filter } from 'rxjs/operators/filter';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';


@Component({
    selector: 'app-tarea',  
    templateUrl: './tarea.component.html', 
    styleUrls: ['./tarea.component.scss'],
    animations: [routerTransition()],
    providers: [TareaService, CrearTareaService, LoginService] 
})
export class TareaComponent implements OnInit {

    // Variables -----------------------------

    tarea: TareaModel[];
    filter: TareaModel = new TareaModel();

    tareaForm: TareaModel;
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
        private tareaService: TareaService,
        private crearTareaService: CrearTareaService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.tareaForm = new TareaModel();

        if(this.login.authUser !== undefined){
    
        }
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();
        this.loadTareas(); 
    }    

    //Funciones --------------------------------------------

    //Cargar Tareas

    private loadTareas(): void {
        this.tareaService.getTareas().subscribe(res => {
            this.tarea = res;   

            },(error)=>{

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Tarea

    save():void{

        if(this.login.authUser !== undefined){
            if(this.tareaForm.id === null){
                this.tareaForm.usuarioCreacion = this.login.authUser.email.toString();
            }else{
                this.tareaForm.usuarioModificacion = this.login.authUser.email.toString();
            }
        }

        this.isValid = this.validate(this.tareaForm);

        if (this.isValid) {

            this.crearTareaService.saveOrUpdate(this.tareaForm).subscribe(res => {
                    this.tareaForm = new TareaModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Tareas');
                    this.loadTareas();
                    this.clean();

            },(error)=>{

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Tareas');
            this.message = "Los campos con * son obligatorios.";
        }
    }

     // Eliminar Tarea
     delete(id) {

        if (id != null) {
            this.tareaForm.id = id;
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
              
                this.tareaForm.usuarioModificacion = this.login.authUser.email.toString();

            this.tareaService.deleteTarea(this.tareaForm).subscribe(res => {

                this.loadTareas();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {

            });       
                
            }
        })

    }

    //Validacion:

    public validate(tareaForm: TareaModel): boolean {
        let isValid = true;

        if (!tareaForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.tareaForm = model; 
        this.visible = true;
    }

    // Limpia los campos
    clean() {
        this.tareaForm = new TareaModel();
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
                if (menu.menu.descripcion === "Empleados") {
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
