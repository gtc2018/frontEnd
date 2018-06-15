import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LoginService } from '../../../../../login/servicios/login.service';
import { BsComponentComponent } from './../../../../bs-component/bs-component.component';
import { CrearPorcentajePorFaseService } from '../../../../porcentajePorFase/servicios/crear-porcentajePorFase.service';
import { Router } from '@angular/router';
import { PorcentajePorFaseModel } from '../../../../../model/porcentajePorFase.model';
import { PermisoModel } from '../../../../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../../../../router.animations';
import { PorcentajePorFaseService } from '../../../../porcentajePorFase/servicios/porcentajePorFase.service';
import { OK } from '../../../../../messages/httpstatus';
import { MenuService } from '../../../../menus/servicios/menu.service';
import { ItemService } from '../../../../items/servicios/item.service';
import { ItemsModel } from '../../../../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../../../../shared/guard/auth.service';
import { EnterpriseModel } from '../../../../../model//enterprise';
import { EnterpriseService } from '../../../../enterprise/enterprise.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { FaseModel } from '../../../../../model/fase';
import { FaseService } from '../../../../fases/servicios/fase.service';

@Component({
  selector: 'create-detail-component',
  templateUrl: './create-detail.html',
  animations: [routerTransition()],
    providers: [PorcentajePorFaseService, CrearPorcentajePorFaseService, EnterpriseService, FaseService, LoginService] 
})
export class CreateDetailComponent implements OnInit, OnChanges {

  // Variables -----------------------------
  enterprises: EnterpriseModel[];
  filterEnterprise : EnterpriseModel[];
  fases: FaseModel[];
  porcentajePorFase: PorcentajePorFaseModel[];
  porcentajePorFaseEnter: PorcentajePorFaseModel[];
  
  unaEmpresa: EnterpriseModel;
  porcentajePorFaseForm: PorcentajePorFaseModel;
  porcentajePorFaseModal: PorcentajePorFaseModel;
  porcentajePorFaseRecord: PorcentajePorFaseModel;
  private permiso: PermisoModel;

  filter: PorcentajePorFaseModel = new PorcentajePorFaseModel();

  message: string;
  messageEmail: string;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  icon: string = "fa fa-caret-left";
  imageSrc: string = 'assets/images/avatar.png';
  empresa: String;

  stateExpand: number = 1;
  nuevaRest: number = 0;
  editPorcentaje: number = 0;
  restPorcentaje: number = 0;
  porcentaje: number = 0;
  sobrePorcentaje: number = 0;
  xmodal: number = 0;

  emailRegex: RegExp;

  filterEn: any;
  user: any;
  items: any;
  menus: any;
  
  dragging: boolean = false;
  deleteFormHide:boolean = false;
  visible: boolean = false;
  private isValid: boolean = true;

  crear = false;
  editar = false;
  eliminar = false;
  leer = false;

  @Input() empresaId: number;

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

    this.unaEmpresa = new EnterpriseModel();
    this.porcentajePorFaseForm = new PorcentajePorFaseModel();
    this.porcentajePorFaseModal = new PorcentajePorFaseModel();
    this.porcentajePorFaseRecord= new PorcentajePorFaseModel();

    if(this.login.authUser !== undefined){

      console.log(this.login.authUser.usuarioId);
    
    }
  }

  // Se inicia con estos metodos
  ngOnInit() {
    this.loadEnterprises();
    this.loadFases();
    this.loadPorcentajePorFaseForInterprise();

  }

  ngOnChanges(){

  }

  //Funciones --------------------------------------------

  //Cargar Empresas

  private loadEnterprises(): void {
    this.enterpriseService.getEnterprises().subscribe(res => {
        this.enterprises = res;

        for(let enterprise of this.enterprises){

          if(enterprise.id === this.empresaId){

            this.empresa = enterprise.descripcion;

          }
        }

    }, (error) => {
        console.log(error);
        this.toastr.error("Error al cargar los datos de Empresa");
    });
  }

  //Cargar Fases

  private loadFases(): void {


    this.faseService.getFaseByEnterprise(this.empresaId).subscribe(res => {
      this.fases = res;

  }, (error) => {
      this.toastr.error("Error al cargar los datos de Fases");
  });

}

  //Cargar PorcentajePorFase

  private loadPorcentajePorFaseForInterprise(): void {

    if(this.editPorcentaje === 2){

      this.porcentajePorFaseModal.id = this.empresaId;

    this.porcentajePorFaseService.getPorcentajePorFaseForEnterprise(this.porcentajePorFaseModal).subscribe(res => {   
      
      this.porcentajePorFase = res;
      
    },(error)=>{
      console.log(error);

      this.toastr.error("Error al cargar los datos");
    });

    }else{

      this.porcentajePorFaseModal.id = this.empresaId;

    this.porcentajePorFaseService.getPorcentajePorFaseForEnterprise(this.porcentajePorFaseModal).subscribe(res => {   
      
      this.porcentajePorFase = res;

      for(let p of res){
        this.restPorcentaje = this.restPorcentaje + p.porcentaje;
      }

      this.restPorcentaje;
      this.toastr.warning("Tener en cuenta el porcentaje total de la empresa : "+this.restPorcentaje+ "%");
      this.xmodal = this.restPorcentaje;
      this.restPorcentaje = 0;
      
    },(error)=>{
      console.log(error);

      this.toastr.error("Error al cargar los datos");
    });
      
    }

    
  }

  //Guardar o editar PorcentajePorFase

  save():void{

    this.porcentajePorFaseForm.clienteId = this.empresaId;
    this.porcentajePorFaseRecord.id = this.empresaId;
        
        this.porcentajePorFaseService.getPorcentajePorFaseForEnterprise(this.porcentajePorFaseRecord).subscribe(res => {   
      
            this.porcentajePorFaseEnter = res;
            this.porcentaje = 0;
      
            for(let p of res){
      
              this.porcentaje = this.porcentaje + p.porcentaje;
            }

            this.porcentaje = this.porcentaje + this.porcentajePorFaseForm.porcentaje;

            if(this.editPorcentaje === 1){

                this.porcentaje = this.porcentaje - this.nuevaRest;
                this.editPorcentaje = 0;
            }
             
      
            if(this.porcentaje > 100){
              this.sobrePorcentaje = 1;
            }
            this.xmodal = this.restPorcentaje;
            this.porcentaje = 0;
   
        if(this.sobrePorcentaje === 1){
            this.toastr.error("El porcentaje asignado a la empresa , esta por encima del 100%");
            this.sobrePorcentaje = 0;
        }else{

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
                    this.editPorcentaje = 2;
                    this.loadPorcentajePorFaseForInterprise();
                    this.loadFases();
                    this.clean();

            },(error)=>{
                console.log(error);

                    this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Porcentaje Por Fase');
            this.message = "Los campos con * son obligatorios.";
        }

        }

    },(error)=>{
        console.log(error);
    
          this.toastr.error("Error al cargar los datos");
        });
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
          
        //this.porcentajePorFaseForm.usuarioModificacion = this.login.authUser.email.toString();
        console.log(this.porcentajePorFaseForm.id);


        this.porcentajePorFaseService.deletePorcentajePorFase(this.porcentajePorFaseForm).subscribe(res => {

          this.loadPorcentajePorFaseForInterprise();
          this.loadFases();

          this.toastr.success('Registro eliminado satisfactoriamente.');
        }, (error) => {
            console.log(error);

        });       
            
      }
    })

}

//Validacion:

public validate(porcentajePorFaseForm: PorcentajePorFaseModel): boolean {
    let isValid = true;


    if (!porcentajePorFaseForm.porcentaje) {
        isValid = false;
    }

    if (porcentajePorFaseForm.porcentaje >= 101) {

      this.toastr.warning('El porcentaje sobre pasa el 100%', 'Creación de Porcentaje Por Fase');
        isValid = false;
    }

    return isValid;
}

// Replica el modelo escogido
upload(model){
  this.porcentajePorFaseForm = model; 
  this.porcentajePorFaseForm.clienteId = this.porcentajePorFaseForm.cliente.id;
  this.porcentajePorFaseForm.fasesId = this.porcentajePorFaseForm.fases.id;
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
    console.log(error);

    this.toastr.error("Error al cargar los datos");
  });
}

//Limpiar el formulario
clean() {
  this.porcentajePorFaseForm = new PorcentajePorFaseModel();
  this.deleteFormHide = false;
  this.visible = false;
}

}
