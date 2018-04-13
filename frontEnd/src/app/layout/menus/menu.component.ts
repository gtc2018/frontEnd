
import { MenusModel } from './../../model/menus.model';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearMenuService } from './servicios/crear-menu.service';
import { Router } from '@angular/router';
//import {IMyDpOptions} from 'ng4-datepicker';


import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MenuService } from './servicios/menu.service';
import { OK } from '../../messages/httpstatus';
import swal from 'sweetalert2';
//import { MenuModel } from '../../model/menu/menu.model';
//import { MenuService } from '../menus/servicios/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    animations: [routerTransition()],
    providers: [MenuService, CrearMenuService]
})
export class MenuComponent implements OnInit {
    private menus: Array<MenusModel>;
    //private roles: Array<RolModel>;
    private menu: MenusModel;
    private isValid: boolean = true;
    private message: string = "";

    visible = false;

    toggleDivCreateMenus() {
        this.visible = !this.visible;
    }

    constructor(
        private menuService: MenuService,
        //private rolService: RMenuService,
        private crearMenuService: CrearMenuService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.menu = new MenusModel();
    }

    ngOnInit() {
        this.loadMenus();
        //this.loadRoles();
    }

    /**
     * Metodo consultar todos los usuarios.
     */
    private loadMenus(): void {
        this.menuService.getMenus().subscribe(res => {
            this.menus = res;
        });
    }

    /* private loadMenus(): void {
         this.menuService.getMenu().subscribe(res => {
        // this.roles = res;   
         });
     }*/

    /**
     * Metodo limipiar los modelos.
     */
    private clearModel(): void {
        this.menu.id = 0;
        this.menu.descripcion = "";
        this.menu.url = "";
        this.menu.icono = "";
        // this.rol.descripcion = "";
    }


    /**
     * Metodo guardar o actualizar
     */
    public saveOrUpdate(): void {
        this.isValid = this.crearMenuService.validate(this.menu);
        if (this.isValid) {
            this.crearMenuService.saveOrUpdate(this.menu).subscribe(res => {
                if (res.responseCode == OK) {
                    this.loadMenus();
                    this.clearModel();
                    this.toastr.success('El registro fue creado o editado satisfactoriamente.');
                } else {
                    this.message = res.message;
                    this.isValid = false;
                }

            });

        } else {
            this.message = "Los campos con * son obligatorios";
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Menús');
        }
    }
    /**
     * Metodo eliminar items:
     */

    delete(id) {

        if (id != null) {
            this.menu.id = id;
        }

        swal({
            //title: 'Esta seguro que desea eliminar el registro?',
            text: "Está seguro que desea eliminar el registro?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {

            if (result.value) {

                this.menuService.deleteMenu(id).subscribe(res => {

                    this.loadMenus();

                    this.toastr.success('Registro eliminado satisfactoriamente.');

                }, (error) => {
                    console.log(error);

                });


            }
        })

    }


    /**
     * Metodo editar permisos:
     */
    public edit(menu): void {
        if (menu.id != null) {


        }
    }

    /**
     * Metodo obtener menu by id:
     */
    private getRolById(c): void {
        this.menuService.getMenuById(c).subscribe(res => {
            this.menu = res;
        });
    }

    upload(model) {
        this.menu = model;
        this.visible = true;
        // this.icon= "fa fa-caret-down";
    }
}
