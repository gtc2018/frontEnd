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
import { InHouseService } from '../../../../in-houses/inHouse.service';
import { InHouseModel } from '../../../../../model/in-house.model';

@Component({
  selector: 'create-detail-component',
  templateUrl: './create-detail.html',
  animations: [routerTransition()],
    providers: [PorcentajePorFaseService, CrearPorcentajePorFaseService, EnterpriseService, InHouseService, LoginService] 
})
export class CreateDetailComponent implements OnInit, OnChanges {

  // Variables -----------------------------
  enterprises: EnterpriseModel[];
  filterEnterprise : EnterpriseModel[];
  inHouses: InHouseModel[];
  
  inHouseForm: InHouseModel;
  private permiso: PermisoModel;

  filter: InHouseModel = new InHouseModel();

  message: string;
  messageEmail: string;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  icon: string = "fa fa-caret-left";
  imageSrc: string = 'assets/images/avatar.png';
  antFechD: string;
  antFechH: string;
  ediFecD: string;
  ediFecH: string;
  dia: string;
  mes: string;
  año: string;

  stateExpand: number = 1;

  emailRegex: RegExp;

  fechaInicio; NgbDateStruct;
  fechaHasta; NgbDateStruc;

  user: any;
  items: any;
  menus: any;
  
  dragging: boolean = false;
  deleteFormHide:boolean = false;
  visible: boolean = false;
  private isValid: boolean = true;
  private isValidFechas: boolean = true;

  crear = false;
  editar = false;
  eliminar = false;
  leer = false;

  @Input() empleadoId: number;

  // Metodos principales----------------------------------------------------
  constructor(
    private enterpriseService: EnterpriseService,
    private inHouseService: InHouseService,
    private router: Router,
    private toastr: ToastrService,
    private login: AuthService,
    private menu: LoginService,
    private menup: LoginService
  ) {

    this.inHouseForm = new InHouseModel();
    this.inHouseForm.empleadoId = this.empleadoId;

  }

  // Se inicia con estos metodos
  ngOnInit() {
    this.loadEnterprises();
    this.loadInHouse();

  }

  ngOnChanges(){

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

  //Cargar InHouse

  private loadInHouse(): void {

    this.inHouseService.getInHouseByEmployee(this.empleadoId).subscribe(res => {
      this.inHouses = res;

      for(let i of this.inHouses){
        i.desde = i.desde.substr(0, 10);
        i.hasta = i.hasta.substr(0, 10);
      }

  }, (error) => {
      this.toastr.error("Error al cargar los datos de InHouse");
  });

}

//Asignar los formatos de las fechas
public formatoFechas(){

  if(this.inHouseForm.desde){
    this.inHouseForm.desde=this.formatoFecha(this.inHouseForm.desde);
  }
  if(this.inHouseForm.hasta){
    this.inHouseForm.hasta=this.formatoFecha(this.inHouseForm.hasta);
 }

}

//Ajustar los formatos de las fechas
public formatoFecha(fecha): string {
  let fechaString ="";

  if(fecha['month'] < 10){
    this.mes = "0"+fecha['month'];
  }else{
    this.mes = fecha['month'];
  }

  if(fecha['day']< 10){
    this.dia = "0"+ fecha['day'];
  }else{
    this.dia = fecha['day'];
  }

  fechaString = fecha['year']+"-"+this.mes+"-"+this.dia+" 00:00:00";
  
  return fechaString;
}

//Jugar con las fechas
gameDate(): void{
  this.inHouseForm.desde = this.antFechD;
  this.inHouseForm.hasta = this.antFechH;
  this.ediFecD = this.antFechD;
  this.ediFecH = this.antFechH;
}

//Guardar
saveOrUpdate():void{

  this.inHouseService.saveOrUpdate(this.inHouseForm).subscribe(res => {
    this.clean();
    this.loadInHouse();

    this.toastr.success('Transacción satisfactoria', 'Gestión de InHouse');

  },(error)=>{ //Controlando posible error

    this.toastr.error(error.error.message,"Error en la transacción");
  });

}

//Antes de guardarInHouse
save():void{
  

  this.inHouseForm.empleadoId = this.empleadoId;
  this.antFechH = this.ediFecH;
  this.antFechD = this.ediFecD;
  this.inHouseForm.desde = this.ediFecD;
  this.inHouseForm.hasta = this.ediFecH;

  if(this.inHouseForm.id === null){
    this.inHouseForm.usuarioCreacion=localStorage.email;
  }else{
      this.inHouseForm.usuarioModificacion =localStorage.email;
  }

  this.isValid = this.validate(this.inHouseForm);

  if (this.isValid){

    this.formatoFechas();
    this.isValidFechas = this.validarFechas();

    if (this.isValidFechas){

      this.inHouseService.getInHouseToDate(this.inHouseForm.desde, this.inHouseForm.hasta, this.inHouseForm.empleadoId).subscribe(res => { 

        if(res.length === 0){
          this.saveOrUpdate();
        }else{
          this.toastr.warning( "ya existe un registro dentro del rango especificado");
        }

      },(error)=>{ 

        this.toastr.error(error.error.message,"Error en la transacción");
        this.gameDate();

      });

    }else {
      if (!this.isValidFechas){
      this.toastr.error(this.message + " por favor revise las fechas","Error en la transacción");
      this.gameDate();
              
      }else{
              
        this.message= this.messageEmail;
        this.messageEmail= undefined;
      }
    }

  }else{
    if(!this.messageEmail){
        this.message= 'Los campos con * son obligatorios!';
        this.gameDate();
    }else{
        this.message= this.messageEmail;
        this.messageEmail= undefined;
    }
  }
}

 // Eliminar InHouse
 delete(id) {


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
        this.inHouseForm.id = id;

        this.inHouseService.deleteInHouse(this.inHouseForm).subscribe(res => {

          this.loadInHouse();
          this.clean();

          this.toastr.success('Registro eliminado satisfactoriamente.');
        }, (error) => {

        });       
            
      }
    })

}

//Validacion:

public validate(inHouseForm: InHouseModel): boolean {
    let isValid = true;

  if(!inHouseForm.clienteId){
    return false;
  }
  if(!inHouseForm.costo){
    return false;
  }
  if(!inHouseForm.desde){
    return false;
  }
  if(!inHouseForm.hasta){
    return false;
  }
  if(!inHouseForm.observacion){
    return false;
  }

  return isValid;
}

//Validar fecha
public validarFechas():boolean{
  let isValidFechas=true;
  
  if( parseInt(this.inHouseForm.desde.toString().substr(0,4)) > parseInt(this.inHouseForm.hasta.toString().substr(0,4))){

    this.message= 'el año del campo Desde no puede ser mayor al campo Hasta';
    isValidFechas = false;

  }else if(parseInt(this.inHouseForm.desde.toString().substr(0,4)) === parseInt(this.inHouseForm.hasta.toString().substr(0,4))){

    if(parseInt(this.inHouseForm.desde.toString().substr(5,2)) > parseInt(this.inHouseForm.hasta.toString().substr(5,2))){

      this.message= 'el mes del campo Desde no puede ser mayor al campo Hasta';
      isValidFechas = false;

    }else if(parseInt(this.inHouseForm.desde.toString().substr(5,2)) === parseInt(this.inHouseForm.hasta.toString().substr(5,2))){

      if(parseInt(this.inHouseForm.desde.toString().substr(8,2)) > parseInt(this.inHouseForm.hasta.toString().substr(8,2))){

        this.message= 'el dia del campo Desde no puede ser mayor al campo Hasta';
        isValidFechas = false;

      }
    }
  }
     
  return isValidFechas;
}

// Replica el modelo escogido
upload(model){

  this.inHouseForm = model;
  console.log(this.inHouseForm);
  this.inHouseForm.clienteId = this.inHouseForm.cliente.id;

  this.fechaInicio = {
    "year": parseInt(this.inHouseForm.desde.toString().substr(0.4)),
    "month":  parseInt(this.inHouseForm.desde.toString().substr(5,2)),
    "day": parseInt(this.inHouseForm.desde.toString().substr(8,2)),
  }
  this.ediFecD = this.fechaInicio;

  this.fechaHasta = {
    "year": parseInt(this.inHouseForm.hasta.toString().substr(0.4)),
    "month":  parseInt(this.inHouseForm.hasta.toString().substr(5,2)),
    "day": parseInt(this.inHouseForm.hasta.toString().substr(8,2)),
  }
  this.ediFecH = this.fechaHasta;

  
}

//Limpiar el formulario
clean() {

  this.inHouseForm = new InHouseModel;
  this.antFechD = undefined;
  this.antFechH = undefined;
  this.ediFecD = undefined;
  this.ediFecH = undefined;
}

}
