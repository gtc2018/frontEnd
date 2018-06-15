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
import { EmployeeModel } from '../../../../../model/employee';
import { EmployeeService } from '../../../../employee/employee.service';
import { RequestService } from '../../../request.service';
import { InvolucradoModel } from '../../../../../model/involucrado.model';
import { RequerimientoModel } from '../../../../../model/requerimiento.model';

@Component({
  selector: 'create-detail-component',
  templateUrl: './create-detail.html',
  animations: [routerTransition()],
    providers: [PorcentajePorFaseService, CrearPorcentajePorFaseService, EmployeeService, 
      EnterpriseService, RequestService, EnterpriseService, FaseService, LoginService] 
})
export class CreateDetailComponent implements OnInit, OnChanges {

  // Variables -----------------------------
  employees: EmployeeModel[];
  enterprises: EnterpriseModel[];
  involucrados: InvolucradoModel[];
  
  private permiso: PermisoModel;

  involucradoForm: InvolucradoModel;
  employeeRequest: EmployeeModel;
  filter: InvolucradoModel = new InvolucradoModel();

  message: string;
  messageEmail: string;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  icon: string = "fa fa-caret-left";
  imageSrc: string = 'assets/images/avatar.png';
  requerimiento: String;
  empresa:string;

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
  @Input() codigoRQM: string;

  // Metodos principales----------------------------------------------------
  constructor(
    private employeeService: EmployeeService,
    private enterpriseService: EnterpriseService,
    private requestService: RequestService,
    private router: Router,
    private toastr: ToastrService,
    private login: AuthService,
    private menu: LoginService,
    private menup: LoginService
  ) {

    this.involucradoForm = new InvolucradoModel;

  }

  // Se inicia con estos metodos
  ngOnInit() { 

    this.loadEmployees();
    this.loadInvolveds();
    this.loadEnterprises();

  }

  ngOnChanges(){

  }

  //Funciones --------------------------------------------

  //Cargar empresa
private loadEnterprises(): void {
  this.enterpriseService.getEnterprises().subscribe(res => {
    this.enterprises = res;
    console.log(res);
  }, (error) => {
      this.toastr.error("Error al cargar los datos de Empresa");
  });
}

  //Cargar empleados
private loadEmployees(): void {

  /*this.employeeService.getEmployeeByRequest(this.empresaId).subscribe(res => {

  this.employees = res;

  },(error)=>{
      this.toastr.error("Error al cargar los datos");
  });*/
}


// se filtran los empleados segun la empresa seleccionada
filtroEmpleado(id: any): void{

  this.empresa = id;
  this.employeeService.getEmployeeByRequest(this.empresaId, id).subscribe(res => {

    this.employees = res;
  
    },(error)=>{
        this.toastr.error("Error al cargar los datos");
    });

}

//Cargar Involucrados
private loadInvolveds(): void {
    this.requestService.getInvolvedByRequest(this.empresaId).subscribe(res => {
        this.involucrados = res;

    }, (error) => {
        this.toastr.error("Error al cargar los datos");
    });
  }

//Guardar o editar Involucrados

save():void{

  this.involucradoForm.requerimientoId = this.empresaId;

  this.requestService.saveOrUpdateInvolved(this.involucradoForm).subscribe(res => {

    this.toastr.success('Transacción satisfactoria', 'Gestión de Involucrados');
    this.loadEmployees();
    this.loadInvolveds();
    this.clean();
           
  },(error)=>{ //Controlando posible error
    this.toastr.error(error.error.message,"Error en la transacción");
            
  });
}

 // Eliminar PorcentajePorFase
 delete(model) {

  swal({
    title: 'Esta seguro?',
    text: "El registro eliminado no podrá ser recuperado",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then((result) => {

    if (result.value) {

      this.employeeService.getEmployeeByRequest(this.empresaId, this.empresa).subscribe(res => {

    this.employees = res;
  
    },(error)=>{
        this.toastr.error("Error al cargar los datos");
    });

    this.employeeService.deleteInvolved(model).subscribe(res=>{
            this.loadEmployees();
            this.loadInvolveds();

            this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Involucrados');

    },(error)=>{  console.log(error);
        swal(
            'Error al eliminar el registro',
            error.error.message,
            'error'
          )
    }
    )
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
  
}

//Limpiar el formulario
clean() {

  this.involucradoForm = new InvolucradoModel;
  this.enterprises = null;
  this.employees = null;
  this.loadEnterprises();
  this.filtroEmpleado(this.empresa);
  
}

}
