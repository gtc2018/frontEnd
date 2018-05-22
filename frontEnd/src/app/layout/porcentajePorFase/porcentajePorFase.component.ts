import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearPorcentajePorFaseService } from './servicios/crear-porcentajePorFase.service';
import { Router } from '@angular/router';
import { PorcentajePorFaseModel } from '../../model/porcentajePorFase.model';
import { PermisoModel } from '../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PorcentajePorFaseService } from './servicios/porcentajePorFase.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';
import { EnterpriseModel } from '../../model//enterprise';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { FaseModel } from '../../model//fase';
import { FaseService } from '../fases/servicios/fase.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-porcentajePorFase',  
    templateUrl: './porcentajePorFase.component.html', 
    styleUrls: ['./porcentajePorFase.component.scss'],
    animations: [routerTransition()],
    providers: [PorcentajePorFaseService,  CrearPorcentajePorFaseService, EnterpriseService, FaseService, LoginService] 
})
export class PorcentajePorFaseComponent implements OnInit {

    // Variables -----------------------------
    enterprises: EnterpriseModel[];
    fases: FaseModel[];
    porcentajePorFase: PorcentajePorFaseModel[];

    porcentajePorFaseForm: PorcentajePorFaseModel;
    filter: PorcentajePorFaseModel = new PorcentajePorFaseModel();
    private permiso: PermisoModel;

    message: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';

    stateExpand: number = 1;

    emailRegex: RegExp;

    user: any;
    items: any;
    menus: any;

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
        private porcentajePorFaseService: PorcentajePorFaseService,
        private enterpriseService: EnterpriseService,
        private faseService: FaseService,
        private crearPorcentajePorFaseService: CrearPorcentajePorFaseService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {

        this.porcentajePorFaseForm = new PorcentajePorFaseModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);
    
        }
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.loadEnterprises();
        this.loadFases();
        this.loadPorcentajePorFases(); 
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

    //Cargar Fases

    private loadFases(): void {
        this.faseService.getFases().subscribe(res => {
            this.fases = res;
            console.log(this.fases);

        }, (error) => {
            console.log(error);
            this.toastr.error("Error al cargar los datos de Empresa");
        });
    }

    //Cargar PorcentajePorFase

    private loadPorcentajePorFases(): void {
        this.porcentajePorFaseService.getPorcentajePorFases().subscribe(res => {
            this.porcentajePorFase = res;   
            console.log("Aqui viene el porcentaje" + this.porcentajePorFase);

            },(error)=>{
                console.log(error);

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Guardar o editar PorcentajePorFase

    save():void{

        console.log(this.login.authUser);

        if(this.login.authUser !== undefined){
            if(this.porcentajePorFaseForm.id === null){
                this.porcentajePorFaseForm.usuarioCreacion = this.login.authUser.email.toString();
            }else {
                this.porcentajePorFaseForm.usuarioModificacion = this.login.authUser.email.toString();
            }
        }

        console.log(this.porcentajePorFaseForm);
        this.isValid = this.validate(this.porcentajePorFaseForm);

        if (this.isValid) {

            this.crearPorcentajePorFaseService.saveOrUpdate(this.porcentajePorFaseForm).subscribe(res => {
                    this.porcentajePorFaseForm = new PorcentajePorFaseModel();
                    this.toastr.success('Transacción satisfactoria', 'Gestión de Porcentaje Por Fase');
                    this.loadPorcentajePorFases();

            },(error)=>{
                console.log(error);

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Porcentaje Por Fase');
            this.message = "Los campos con * son obligatorios.";
        }
    }

     // Eliminar PorcentajePorFase
     delete(id) {

        if (id != null) {
            this.porcentajePorFaseForm.id = id;
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
              
              //  this.porcentajePorFaseForm.usuarioModificacion = this.login.authUser.email.toString();
            console.log(this.porcentajePorFaseForm.id);


            this.porcentajePorFaseService.deletePorcentajePorFase(this.porcentajePorFaseForm).subscribe(res => {

                this.loadPorcentajePorFases();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {
                console.log(error);

            });       
                
            }
        })

    }

    // Limpia los campos
    clean() {
        this.porcentajePorFaseForm = new PorcentajePorFaseModel();
        this.deleteFormHide = false;
        this.visible = false;
    }

    //Validacion:

    public validate(porcentajePorFaseForm: PorcentajePorFaseModel): boolean {
        let isValid = true;

        if (!porcentajePorFaseForm.clienteId) {
            isValid = false;
        }

        if (!porcentajePorFaseForm.porcentaje) {
            isValid = false;
        }

        if (porcentajePorFaseForm.porcentaje >= 101) {
            isValid = false;
        }

        return isValid;
    }

    // Replica el modelo escogido
    upload(model){
        this.porcentajePorFaseForm = model; 
        this.porcentajePorFaseForm.fasesId = this.porcentajePorFaseForm.fases.id;
        this.porcentajePorFaseForm.clienteId = this.porcentajePorFaseForm.cliente.id;
        this.visible = true;
    }
}
