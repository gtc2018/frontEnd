import { FaseModel } from './../../model/fase';
import { FaseService } from './servicios/fase.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { filter } from 'rxjs/operators/filter';

import { OK } from '../../messages/httpstatus';
import swal from 'sweetalert2';
import { PermisoModel } from '../../model/permiso.model';
import { LoginService } from '../../login/servicios/login.service';

@Component({
    selector: 'app-fase',
    templateUrl: './fase.component.html',
    styleUrls: ['./fase.component.scss'],
    animations: [routerTransition()],
    providers: [FaseService, LoginService]
})
export class FaseComponent implements OnInit {

    // Variables --------------------------------------------------

    private isValid: boolean = true;
    private message: string = "";
    private fase: FaseModel;
    private permiso: PermisoModel;
    private fases: Array<FaseModel>;
    grupos = [];
    contador: number = 0;
    faseIgual:number = 0;
    filter: FaseModel = new FaseModel();

    user: any;
    items: any;
    menus: any;

    visible = false;
    crear = false;
    editar = false;
    eliminar = false;
    leer = false;
    limpiar: boolean = false;

    // Metodos principales----------------------------------------------------
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private faseService: FaseService,
        private menu: LoginService,
        private menup: LoginService
    ) {
        this.fase = new FaseModel();
    }

    // Funciones ------------------------------------------------------------------

    //Metodos de inicio
    ngOnInit() {
        this.getItems();
        this.loadFases();

    }

    //cambiar de estado la barra de crear
    toggleDivCreateMenus() {
        this.visible = !this.visible;
    }

    private loadFases(): void {
        this.faseService.getFases().subscribe(res => {
            this.fases = res;
        }, (error) => {
            this.toastr.error(error.error.message, "Error al cargar fases.");

        });

    }


    private clearModel(): void {
        this.fase.descripcion = "";
        this.limpiar = false
    }


    //Guardar
    save():void{

        this.faseService.saveOrUpdate(this.fase).subscribe(res => {
            this.toastr.success('Transacción realizada satisfactoriamente.');
            this.loadFases();
            this.clearModel();

        }, (error) => {
            this.toastr.error(error.error.message, "Error al guardar o actulizar la fase.");

        });
    }

    //Antes de guardar
    public saveOrUpdate(): void {

        if(this.fase.id === null){
            this.fase.usuarioCreacion = localStorage.email;
        }else{
            this.fase.usuarioModificacion = localStorage.email;
        }

        this.isValid = this.validate(this.fase);

        if (this.isValid) {

            this.faseService.getFases().subscribe(res => {
                
                for(let f  of res){

                    if(this.fase.descripcion === f.descripcion){
                        this.faseIgual = 1
                    }
                    
                }

                if(this.faseIgual !== 1){
                    this.save();
                }else{
                    this.toastr.error("Ya existe un registro con este nombre", "Error gestion de fases.");   
                    this.faseIgual = 0; 
                }

            }, (error) => {
                this.toastr.error(error.error.message, "Error al cargar fases.");
            }); 
            
        }else{
            this.message = "Los campos con * son obligatorios.";
        }



    }

    delete(id) {

        if (id != null) {
            this.fase.id = id;
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

                this.faseService.deleteFase(this.fase).subscribe(res => {
                    this.toastr.success('El registro fue eliminado satisfactorio.');
                    this.loadFases();
                    this.clearModel();

                }, (error) => {
                    this.toastr.error('Falló la eliminacion del registro.');
                    console.log(error);

                });


            }
        })

    }


    public edit(fase: FaseModel): void {
        sessionStorage.setItem('fase', JSON.stringify(fase));
        this.fase = JSON.parse(sessionStorage.getItem("fase"));
        this.visible = true;
        this.limpiar = true;

    }

    private getRolById(c): void {

    }

    upload(model) {

    }

    public validate(fase: FaseModel): boolean {
        let isValid = true;
        if (!this.fase.descripcion) {
            isValid = false;
        }
        return isValid;

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
                if (menu.menu.descripcion === "Fases") {
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
