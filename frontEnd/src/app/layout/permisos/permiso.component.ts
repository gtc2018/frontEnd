


import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearPermisoService } from './servicios/crear-permiso.service';
import { Router } from '@angular/router';
import { PermisoModel } from './../../model/permiso.model';


import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PermisoService } from './servicios/permiso.service';
import { OK } from '../../messages/httpstatus';
import { RolModel } from '../../model/rol.model';
import { RolService } from '../roles/servicios/rol.service';
import { MenusModel } from '../../model/menus.model';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';


import swal from 'sweetalert2';


@Component({
    selector: 'app-permiso',
    templateUrl: './permiso.component.html',
    styleUrls: ['./permiso.component.scss'],
    animations: [routerTransition()],
    providers: [PermisoService, CrearPermisoService, RolService, MenuService, ItemService, LoginService]
})
export class PermisoComponent implements OnInit {
    private menu: MenusModel;
    private roles: Array<RolModel>;
    private rol: RolModel;
    private item: ItemsModel;
    private items: Array<ItemsModel>;
    private permiso: PermisoModel;
    private isValid: boolean = true;
    private message: string = "";

    visible = false;
    permisos: any;
    menus: any;

    toggleDivCreatePermisos() {
        this.visible = !this.visible;
    }

    constructor(
        private permisoService: PermisoService,
        private rolService: RolService,
        private menuService: MenuService,
        private itemService: ItemService,
        private crearPermisoService: CrearPermisoService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menulog: LoginService,
        private menup: LoginService
    ) {
        this.permiso = new PermisoModel();

        this.permiso.crear = 0;
    }
     /**
      * Metodo para actualizar un registro de permisos
      */
     changeState(model){

         model.menu_id = model.menu.id;

        if (model.crear) {
            model.crear = 1;

        } else {
            model.crear = 0;
        }

        if (model.editar) {
            model.editar = 1;

        } else {
            model.editar = 0;
        }

        if (model.leer) {
            model.leer = 1;

        } else {
            model.leer = 0;
        }

        if (model.eliminar) {
            model.eliminar = 1;

        } else {
            model.eliminar = 0;
        }

        console.log(model);

            this.crearPermisoService.saveOrUpdate(model).subscribe(res => {

                    this.loadPermisos();

                    this.toastr.success('Registro actualizado exitosamente!');

            }, (error)=>{

                console.log(error);

                this.loadPermisos();

                swal(
                    'Error al eliminar el registro',
                    error.error.message,
                    'error'
                  )
            }
        );
     }


    /**
     * Metodo consultar todos los usuarios.
     */

    private loadPermisos(): void {
        this.permisoService.getPermisos().subscribe(res => {
            console.log(res);
            this.permisos = res;

        });
    }

    private loadRoles(): void {
        this.rolService.getRoles().subscribe(res => {
            this.roles = res;
        });
    }

    private loadMenus(): void {
        this.menuService.getMenus().subscribe(res => {
            this.menus = res;
        });
    }


    /**
     * Metodo obtener los items relacionados a un menu
     */
    private getItemsByMenu(c): void {
        this.itemService.getItemsByMenu(c).subscribe(res => {
            this.items = res;
        });
    }


    /**
     * Metodo guardar o actualizar
     */
    public saveOrUpdate(): void {
        if (this.permiso.crear) {
            this.permiso.crear = 1;

        } else {
            this.permiso.crear = 0;
        }

        if (this.permiso.editar) {
            this.permiso.editar = 1;

        } else {
            this.permiso.editar = 0;
        }

        if (this.permiso.leer) {
            this.permiso.leer = 1;

        } else {
            this.permiso.leer = 0;
        }

        if (this.permiso.eliminar) {
            this.permiso.eliminar = 1;

        } else {
            this.permiso.eliminar = 0;
        }

        console.log(this.permiso);

        this.isValid = this.validate(this.permiso);
        if (this.isValid) {


            this.crearPermisoService.saveOrUpdate(this.permiso).subscribe(res => {

                if (res.responseCode == OK) {
                    this.loadPermisos();
                    //this.menup.loadMenus(this.permiso);

                    this.permiso = new PermisoModel();

                    this.toastr.success('Registro guardado exitosamente!');

                } else {
                    this.message = res.message;
                    this.isValid = false;
                }

            });

        } else {
            this.message = "Los campos con * son obligatorios.";
        }

    }

    /**
     * Metodo actualizar permisos:
     */
    public update(permiso): void {
        // sessionStorage.setItem('permiso', JSON.stringify(permiso));
        // this.permiso = JSON.parse(sessionStorage.getItem("permiso"));
        this.permiso = permiso;
        // this.visible = true;

    }

    /**
     * Metodo editar permisos:
     */

    /*
    public edit(permiso): void {


        if (this.permiso.crear) {
            this.permiso.crear = "1";

        } else {
            this.permiso.crear = "0";
        }

        if (this.permiso.editar) {
            this.permiso.editar = "1";

        } else {
            this.permiso.editar = "0";
        }

        if (this.permiso.leer) {
            this.permiso.leer = "1";

        } else {
            this.permiso.leer = "0";
        }

        if (this.permiso.eliminar) {
            this.permiso.eliminar = "1";

        } else {
            this.permiso.eliminar = "0";
        }

        this.permiso = permiso;

        console.log(this.permiso);

        if (this.permiso.id != null) {
            this.permiso.usuarioModificacion = this.login.authUser.email.toString();
            this.permisoService.updatePermiso(this.permiso).subscribe(res => {

                this.loadPermisos();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {
                console.log(error);
                this.toastr.error('Fallo la actualizacion del registro.' + this.permiso.id);

            });

        }

    }

    */


    /**
     * Metodo eliminar permisos:
     */

    delete(id) {

        if (id != null) {
            this.permiso.id = id;
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

                this.permiso.usuarioModificacion = localStorage.user;
            console.log(this.permiso.id);


            this.permisoService.deletePermiso(this.permiso).subscribe(res => {

                this.loadPermisos();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {
                console.log(error);

            });


            }
        })

    }




    /**
     * Metodo consultar por ID
     */

    private getPermisoById(permisoJson: PermisoModel): void {
        this.permisoService.getPermisoById(permisoJson).subscribe(res => {
            this.permiso = res;
        });
    }

    upload(model) {
        this.permiso = model;
        this.visible = true;
        // this.icon= "fa fa-caret-down";
    }

    //Validacion:

    public validate(permiso: PermisoModel): boolean {
        let isValid = true;



        if (!permiso.rolId) {
            isValid = false;
        }


        return isValid;
    }


    /*
        private getItemsPermisos(): void {
            //this.permiso = new PermisoModel();
            this.permiso.rolId = this.login.authUser.rolId;
            this.menulog.loadMenus(this.permiso).subscribe(res => {
                this.permisos = res
                console.log("======================= PERMISOS PERMISOS: ==============");

                /*
                for (let menu of this.menus) {
                    if (menu.menu.descripcion === "Permisos") {
                        console.log("===============ITEMS EMPRESAS:======================")
                        console.log(menu);

                    }

                }
            }, (error) => {
                console.log(error);

            });

        } */

    ngOnInit() {
        this.loadPermisos();
        this.loadRoles();
        this.loadMenus();
        //this.getItemsPermisos();
    }

}
