import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearAlcanceService } from './servicios/crear-alcance.service';
import { Router } from '@angular/router';
import { AlcanceModel } from '../../model/alcance.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AlcanceService } from './servicios/alcance.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-alcance',  
    templateUrl: './alcance.component.html', 
    styleUrls: ['./alcance.component.scss'],
    animations: [routerTransition()],
    providers: [AlcanceService, CrearAlcanceService, LoginService] 
})
export class AlcanceComponent implements OnInit {

    // Variables -----------------------------

    alcance: AlcanceModel[];
    filter: AlcanceModel = new AlcanceModel();

    alcanceForm: AlcanceModel;
    private permiso: PermisoModel;

    message: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';

    stateExpand: number = 1;
    identificador: Number = 0;

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
        private alcanceService: AlcanceService,
        private crearAlcanceService: CrearAlcanceService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.alcanceForm = new AlcanceModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);
    
        }
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.loadAlcances(); 
    }    

    //Funciones --------------------------------------------

    //Cargar Alcances

    private loadAlcances(): void {
        this.alcanceService.getAlcances().subscribe(res => {
            this.alcance = res;   

            },(error)=>{

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar Cargo

    save():void{

        if(this.login.authUser !== undefined){
            if(this.alcanceForm.id === null){
            this.alcanceForm.usuarioCreacion = this.login.authUser.email.toString();
        }else{
            this.alcanceForm.usuarioModificacion = this.login.authUser.email.toString();
        }
        }

        this.isValid = this.validate(this.alcanceForm);

        if (this.isValid) {

            this.crearAlcanceService.saveOrUpdate(this.alcanceForm).subscribe(res => {
                    this.alcanceForm = new AlcanceModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Alcance');
                    this.loadAlcances();

            },(error)=>{

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Alcances');
            this.message = "Los campos con * son obligatorios.";
        }
    }

     // Eliminar Cargo
     delete(id) {

        if (id != null) {
            this.alcanceForm.id = id;
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
              
                this.alcanceForm.usuarioModificacion = this.login.authUser.email.toString();

            this.alcanceService.deleteAlcance(this.alcanceForm).subscribe(res => {

                this.loadAlcances();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {

            });       
                
            }
        })

    }

    //Validacion:

    public validate(alcanceForm: AlcanceModel): boolean {
        let isValid = true;


        if (!alcanceForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.alcanceForm = model; 
        this.visible = true;
    }

    // Limpia los campos
    clean() {
        this.alcanceForm = new AlcanceModel();
        this.deleteFormHide = false;
        this.visible = false;
    }
}
