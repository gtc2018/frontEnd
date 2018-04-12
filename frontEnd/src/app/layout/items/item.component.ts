import { MenusModel } from './../../model/menus.model';
import { ItemsModel } from './../../model/items.model';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearItemService } from './servicios/crear-item.service';
import { Router } from '@angular/router';

//import {IMyDpOptions} from 'ng4-datepicker';


import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ItemService } from './servicios/item.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
//import { ItemModel } from '../../model/item/item.model';
//import { MenuModel } from '../../model/menu/menu.model';
//import { MenuService } from '../menus/servicios/menu.service';

@Component({ 
    selector: 'app-item',
    templateUrl: './item.component.html', 
    styleUrls: ['./item.component.scss'], 
    animations: [routerTransition()],
    providers: [ItemService, CrearItemService, MenuService]
})
export class ItemComponent implements OnInit {

    private items: Array<ItemsModel>;
    private menus: Array<MenusModel>;
    private menu: MenusModel;
    private item: ItemsModel;
    private isValid: boolean = true;
    private message: string = "";

    visible = false;

    toggleDivCreateItems() {
        this.visible = !this.visible;
    } 

    constructor(
        private itemService: ItemService,
        private menuService: MenuService,
        private crearItemService: CrearItemService,
        private router: Router,
        private toastr: ToastrService
    ) {
        if (sessionStorage.getItem("item")) {
            this.item = JSON.parse(sessionStorage.getItem("item"));            
        } else {
            this.item = new ItemsModel();
            //this.item.menu = new MenuModel();
        }
        //this.usuario = new UsuarioModel();
    }

    ngOnInit() {
        this.loadItems();
        this.loadMenus();       
        //this.menu = this.menuService.
    }

    /**
     * Metodo consultar todos los usuarios.
     */
    private loadItems(): void {
            this.itemService.getItems().subscribe(res => {
            this.items = res;   
        });
    }

   private loadMenus(): void {
        this.menuService.getMenus().subscribe(res => {
        this.menus = res;   
        });
    }

    /**
     * Metodo limipiar los modelos.
     */
    private clearModel(): void {
        this.item.crear = "";
        this.item.editar = "";
        this.item.eliminar = "";
        this.item.leer = "";
       // this.rol.descripcion = "";
    }


    /**
     * Metodo guardar o actualizar
     */
    public saveOrUpdate(menu:string, item:string, url:string, icono:string): void {
           /* console.log("menu ",menu);
            console.log("item ",item);
            console.log("url ",url);
            console.log("icono ",icono);
            this.item.menu.menuId = menu;
            this.item.descripcion = item;
            this.item.url = url;
            this.item.icono = icono; 
            
            this.crearItemService.saveOrUpdate(this.item).subscribe(res => {
            
            if (res.responseCode == OK) {
                console.log(this.router.navigate(['/items']));                
                console.log(this.router.url);
                location.reload();
            } else {
                this.message = res.message;
                this.isValid = false;
            }

        }); 
        /*this.isValid = this.crearItemService.validate(this.item); 
        if (this.isValid) {
            this.crearItemService.saveOrUpdate(this.item).subscribe(res => {               
                if (res.responseCode == OK) {    
                    this.loadItems();
                    this.clearModel(); 
                    //location.reload();
                } else {
                    this.message = res.message;
                    this.isValid = false;
                }
            });

        } else { 
            this.message = "Los campos con * son obligatorios";
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Menús');
        }*/
    }

    /**
     * Metodo editar permisos:
     */

    public edit(item: ItemsModel): void {
        sessionStorage.setItem('item', JSON.stringify(item));
        this.item = JSON.parse(sessionStorage.getItem("item"));
        this.visible = true;
       
    }

    /**
     * Metodo eliminar items:
     */

    public delete(c): void {
        this.itemService.deleteItem(c).subscribe(res => {
           // this.item = res;   
            });
            location.reload();       
    }

    private getItemsByMenu(menuJson: MenusModel): void {
        this.itemService.getItemsByMenu(menuJson).subscribe(res => {
            this.items = res;   
        });
    }

    private change(){
        console.log("vvv");
    }

} 
