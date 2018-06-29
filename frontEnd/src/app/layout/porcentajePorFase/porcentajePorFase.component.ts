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
    porcentajePorFaseEnter: PorcentajePorFaseModel[];

    porcentajePorFaseForm: PorcentajePorFaseModel;
    porcentajePorFaseRecord = new PorcentajePorFaseModel;
    filter: PorcentajePorFaseModel = new PorcentajePorFaseModel();
    private permiso: PermisoModel;

    message: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';

    stateExpand: number = 1;
    porcentaje: number = 0;
    sobrePorcentaje: number = 0;
    editPorcentaje: number = 0;
    restPorcentaje: number = 0;
    nuevaRest: number = 0;
    faseExist: number = 0;

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
        this.porcentajePorFaseRecord = new PorcentajePorFaseModel();

    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();
        this.loadEnterprises();
        this.loadFases();
        this.loadPorcentajePorFases(); 
    }    

    //Funciones --------------------------------------------

    //Cargar Empresas

    private loadEnterprises(): void {
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;

        }, (error) => {
            this.toastr.error("Error al cargar los datos de Empresa");
        });
    }

    //Cargar Fases

    private loadFases(): void {
        this.faseService.getFases().subscribe(res => {
            this.fases = res;

        }, (error) => {
            this.toastr.error("Error al cargar los datos de Empresa");
        });
    }

    //Cargar PorcentajePorFase

    private loadPorcentajePorFases(): void {
        this.porcentajePorFaseService.getPorcentajePorFases().subscribe(res => {
            this.porcentajePorFase = res;   

            },(error)=>{

                this.toastr.error("Error al cargar los datos");
            });
    }

    //Calcular el valor del porcentaje de una empresa

  private loadPorcentajePorFaseForInterprise(id): void {


    this.porcentajePorFaseRecord.id = id;

    this.porcentajePorFaseService.getPorcentajePorFaseForEnterprise(this.porcentajePorFaseRecord).subscribe(res => {   
      
      this.porcentajePorFaseEnter = res;

      for(let p of res){

        this.porcentaje = this.porcentaje + p.porcentaje;
      }

      if(this.porcentaje > 100){
        this.sobrePorcentaje = 1;
      }

      if(this.porcentaje === 100){
          this.sobrePorcentaje = 1;
      }
      

      this.porcentaje = 0;
    },(error)=>{

      this.toastr.error("Error al cargar los datos");
    });
  }

  //Para guardar
  saveOrUpdate():void{

    if(this.porcentajePorFaseForm.id === null){
        this.porcentajePorFaseForm.usuarioCreacion = localStorage.email
    }else {
        this.porcentajePorFaseForm.usuarioModificacion = localStorage.email;
    }
    

    this.crearPorcentajePorFaseService.saveOrUpdate(this.porcentajePorFaseForm).subscribe(res => {
        this.porcentajePorFaseForm = new PorcentajePorFaseModel();
        this.toastr.success('Transacción satisfactoria', 'Gestión de Porcentaje Por Fase');
        this.loadPorcentajePorFases();
        this.clean();

    },(error)=>{

        this.toastr.error(error.error.message,"Error en la transacción");
    });
  }

    //Antes de guardar
    save():void{


        this.porcentajePorFaseRecord.id = this.porcentajePorFaseForm.clienteId;
       
        this.isValid = this.validate(this.porcentajePorFaseForm);
        
        if (this.isValid) {

            this.porcentajePorFaseService.getPorcentajePorFaseForEnterprise(this.porcentajePorFaseRecord).subscribe(res => {   
      
                this.porcentajePorFaseEnter = res;
                this.porcentaje = 0;
          
                for(let p of res){
          
                  this.porcentaje = this.porcentaje + p.porcentaje;
                  if(parseInt(this.porcentajePorFaseForm.fasesId.toString()) === p.fases.id){
                      
                      this.faseExist = 1;
                  }
                }
    
                this.porcentaje = this.porcentaje + this.porcentajePorFaseForm.porcentaje;
    
                if(this.editPorcentaje === 1){
    
                    this.porcentaje = this.porcentaje - this.nuevaRest;
                    //this.faseExist = 0;
                }
                 
          
                if(this.porcentaje > 100){
                  this.sobrePorcentaje = 1;
                }
                this.porcentaje = 0;
       
            if(this.sobrePorcentaje === 1){
                this.toastr.error("El porcentaje asignado a la empresa , esta por encima del 100%");
                this.sobrePorcentaje = 0;
            }else{

                if(this.faseExist !== 1){

                    this.saveOrUpdate();
                }else{
                    this.toastr.error("Ya se encuentra esta fase asociada a la empresa");
                    this.faseExist = 0;
                }
            }
    
            },(error)=>{
              this.toastr.error("Error al cargar los datos");
            });

        } else {
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

            this.porcentajePorFaseService.deletePorcentajePorFase(this.porcentajePorFaseForm).subscribe(res => {

                this.clean();
                this.loadPorcentajePorFases();

                this.toastr.success('Registro eliminado satisfactoriamente.');
            }, (error) => {

            });       
                
            }
        })

    }

    // Limpia los campos
    clean() {
        this.porcentajePorFaseForm = new PorcentajePorFaseModel();
        this.deleteFormHide = false;
        this.visible = false;
        this.editPorcentaje = 0;
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
        this.editPorcentaje = 1;
        this.nuevaRest = this.porcentajePorFaseForm.porcentaje;

        this.porcentajePorFaseRecord.id = this.porcentajePorFaseForm.clienteId;

        this.porcentajePorFaseService.getPorcentajePorFaseForEnterprise(this.porcentajePorFaseRecord).subscribe(res => {   
      
           this.porcentajePorFaseEnter = res;

            for(let p of res){

                this.restPorcentaje = this.restPorcentaje + p.porcentaje;
            }

            this.restPorcentaje;
            this.toastr.warning("Tener en cuenta el porcentaje total de la empresa : "+this.restPorcentaje+ "%");
            this.restPorcentaje = 0;

            },(error)=>{

            this.toastr.error("Error al cargar los datos");
            });
    }

    //Permisos
    private getItems(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {

            console.log(this.menus = res);
            for (let menu of this.menus) {
                //this.items = menu.item;
                if (menu.menu.descripcion === "Porcentaje Por Fase") {
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
