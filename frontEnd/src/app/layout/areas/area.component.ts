import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearAreaService } from './servicios/crear-area.service';
import { Router } from '@angular/router';
import { AreaModel } from '../../model/area.model';
import { PermisoModel } from '../../model/permiso.model';

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AreaService } from './servicios/area.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';
import { EnterpriseModel } from '../../model//enterprise';
import { EnterpriseService } from '../enterprise/enterprise.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-area',  
    templateUrl: './area.component.html', 
    styleUrls: ['./area.component.scss'],
    animations: [routerTransition()],
    providers: [AreaService, CrearAreaService, EnterpriseService, LoginService] 
})
export class AreaComponent implements OnInit {

    // Variables -----------------------------

    enterprises: EnterpriseModel[];
    area: AreaModel[];

    areaForm: AreaModel;
    filter: AreaModel = new AreaModel();
    private permiso: PermisoModel;

    message: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';

    stateExpand: number = 1;

    emailRegex: RegExp;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;
    private isValid: boolean = true;

    user: any;
    items: any;
    menus: any;

    crear = false;
    editar = false;
    eliminar = false;
    leer = false;

    // Metodos principales----------------------------------------------------
    constructor(
        private areaService: AreaService,
        private enterpriseService: EnterpriseService,
        private crearAreaService: CrearAreaService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {
        this.areaForm = new AreaModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);
    
        }
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();
        this.loadEnterprises();  
        this.loadAreas(); 
    } 

    //Funciones --------------------------------------------

    //Cargar Empresas

    private loadEnterprises(): void {
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;
            console.log(this.enterprises);

        }, (error) => {
            console.log(error);
            this.toastr.error("Error al cargar los datos de Empresa");
        });
    }

    //Cargar Areas

    private loadAreas(): void {
        this.areaService.getAreas().subscribe(res => {
            this.area = res;   
            console.log("Aqui viene el area" + this.area);

            },(error)=>{
                console.log(error);

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Area

    save():void{

        console.log(this.login.authUser);

        if(this.login.authUser !== undefined){

            if(this.areaForm.id === null){

                this.areaForm.usuarioCreacion = this.login.authUser.email.toString();

            }else{

                this.areaForm.usuarioModificacion = this.login.authUser.email.toString();
            }
            
        }

        console.log(this.areaForm);
        this.isValid = this.validate(this.areaForm);

        if (this.isValid) {

            this.crearAreaService.saveOrUpdate(this.areaForm).subscribe(res => {
                    this.areaForm = new AreaModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Areas');
                    this.loadAreas();
                    this.clean();

            },(error)=>{
                console.log(error);

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Roles');
            this.message = "Los campos con * son obligatorios.";
        }
    }

    // Eliminar Area
    delete(id) {

        if (id != null) {
            this.areaForm.id = id;
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
              
                this.areaForm.usuarioModificacion = this.login.authUser.email.toString();
            console.log(this.areaForm.id);


            this.areaService.deleteArea(this.areaForm).subscribe(res => {

                this.clean();
                this.loadAreas();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {
                console.log(error);

            });       
                
            }
        })

    }

    // Se limpia los campos
    clean() {
        this.areaForm = new AreaModel();
        this.deleteFormHide = false;
        this.visible = false;
      }

    //Validacion:

    public validate(areaForm: AreaModel): boolean {
        let isValid = true;

        if (!areaForm.clienteId) {
            isValid = false;
        }

        if (!areaForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo
    upload(model){        
        this.areaForm = model;
        this.areaForm.clienteId = this.areaForm.cliente.id;
        this.visible = true;
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
                if (menu.menu.descripcion === "Areas") {
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
