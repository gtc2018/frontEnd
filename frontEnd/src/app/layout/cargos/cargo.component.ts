import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearCargoService } from './servicios/crear-cargo.service';
import { Router } from '@angular/router';
import { CargoModel } from '../../model/cargo.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CargoService } from './servicios/cargo.service';
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
    selector: 'app-cargo',  
    templateUrl: './cargo.component.html', 
    styleUrls: ['./cargo.component.scss'],
    animations: [routerTransition()],
    providers: [CargoService, CrearCargoService, EnterpriseService, LoginService] 
})
export class CargoComponent implements OnInit {

    // Variables -----------------------------

    enterprises: EnterpriseModel[];
    cargo: CargoModel[];
    filter: CargoModel = new CargoModel();

    cargoForm: CargoModel;
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
        private cargoService: CargoService,
        private enterpriseService: EnterpriseService,
        private crearCargoService: CrearCargoService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.cargoForm = new CargoModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);
    
        }

        this.filter.cliente = new EnterpriseModel();
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();
        this.loadEnterprises();
        this.loadCargos(); 
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

    //Cargar Cargos

    private loadCargos(): void {
        this.cargoService.getCargos().subscribe(res => {
            this.cargo = res;   
            console.log("Aqui viene el cargo" + this.cargo);

            },(error)=>{
                console.log(error);

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Cargo

    save():void{

        console.log(this.login.authUser);

        if(this.login.authUser !== undefined){
            if(this.cargoForm.id === null){

                this.cargoForm.usuarioCreacion = this.login.authUser.email.toString();

            }else{

                this.cargoForm.usuarioModificacion = this.login.authUser.email.toString();
            }
            
        }

        console.log(this.cargoForm);
        this.isValid = this.validate(this.cargoForm);

        if (this.isValid) {

            this.crearCargoService.saveOrUpdate(this.cargoForm).subscribe(res => {
                    this.cargoForm = new CargoModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Cargos');
                    this.loadCargos();
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

     // Eliminar Cargo
     delete(id) {

        if (id != null) {
            this.cargoForm.id = id;
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
              
                this.cargoForm.usuarioModificacion = this.login.authUser.email.toString();
            console.log(this.cargoForm.id);


            this.cargoService.deleteCargo(this.cargoForm).subscribe(res => {

                this.loadCargos();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {
                console.log(error);

            });       
                
            }
        })

    }

    //Validacion:

    public validate(cargoForm: CargoModel): boolean {
        let isValid = true;

        if (!cargoForm.clienteId) {
            isValid = false;
        }

        if (!cargoForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.cargoForm = model; 
        this.cargoForm.clienteId = this.cargoForm.cliente.id;
        this.visible = true;
    }

    // Limpia los campos
    clean() {
        this.cargoForm = new CargoModel();
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
                if (menu.menu.descripcion === "Cargos") {
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
