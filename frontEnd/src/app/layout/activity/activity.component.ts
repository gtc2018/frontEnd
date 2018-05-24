
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Ng2SmartTableModule, ViewCell } from 'ng2-smart-table';
import { filter } from 'rxjs/operators/filter';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/guard/auth.service';
import { LoginService } from '../../login/servicios/login.service';
import { RegistroActividadService } from './servicios/registroActividad.service';
import { CrearRegistroActividadService } from './servicios/crear-registroActividad.service';
import { RegistroActividadModel } from '../../model/registroActividad.model';
import { PermisoModel } from '../../model/permiso.model';

@Component({
    templateUrl: './activity.html',
    styleUrls: ['./activity.scss'],
    animations: [routerTransition()],
    providers: [RegistroActividadService, CrearRegistroActividadService, LoginService]
})
export class ActivityComponent implements OnInit {
    
  //Variables-------------------------------------------------------------
  registroActividad: RegistroActividadModel[];
  registroActividadForm: RegistroActividadModel;

  user: any;
  items: any;
  menus: any;
  private permiso: PermisoModel;

  crear = false;
  administrador: boolean = false;
  empleado: boolean = false;

  messageEmail: string;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  icon: string = "fa fa-caret-left";
  imageSrc: string = 'assets/images/avatar.png';
  fotoEmpresa: string = 'assets/images/logo.png';
  fotoEmpleado: string = 'assets/images/avatar.png';

  stateExpand: number = 1;
  identificador: number = 0;

  emailRegex: RegExp;

  dragging: boolean = false;
  deleteFormHide:boolean = false;
  visible: boolean = false;

  employee= [];
  filter: RegistroActividadModel = new RegistroActividadModel();
  

  /*filter = {
    columns: {
    cliente: {
        valuePrepareFunction: (cliente) => { return cliente.descripcion; }
      },
      proyecto: {
        valuePrepareFunction: (proyecto) => { return proyecto.descripcion; }
      },
      requerimiento: {
        valuePrepareFunction: (requerimiento) => { return requerimiento.descripcion; }
      },
      area: {
        valuePrepareFunction: (area) => { return area.descripcion; }
      }
    }
  };*/

  private isValid: boolean = true;


  constructor(private router:Router,
    private registroActividadService: RegistroActividadService,
    private crearRegistroActividad: CrearRegistroActividadService,
    private toastr: ToastrService,
    private login:AuthService,
    private menu: LoginService,
    private session: AuthService) 
    {

      this.registroActividadForm = new RegistroActividadModel();

      if(this.login.authUser !== undefined){

        console.log(this.login.authUser.email);

      }
  
  }

  // Se inicia con estos metodos-------------------------------------
  ngOnInit() {
    this.validarPermisos();
    this.getItemsEmpresas();
    this.loadRegistroActividades();
    console.log(this);
  }

  //Funciones --------------------------------------------------

  //Cargar Registros de actividades

  private loadRegistroActividades(): void {

    if(this.administrador === true){

      this.registroActividadService.getRegistroActividades().subscribe(res => {
        this.registroActividad = res; 
  
        console.log(this.registroActividad);
        },(error)=>{
  
          this.toastr.error("Error al cargar los datos");
      });

    }else{

      this.registroActividadService.getRegistreToEmployee(localStorage.empleado).subscribe(res => {   
      
        this.registroActividad = res;
  
      },(error)=>{
      
        this.toastr.error("Error al cargar los datos");
      });

    }
  }

  new():void{
    console.log("nuevo registro");
  }

  // Se valida si es administrador o empleado
  private validarPermisos(): void {

    this.identificador = localStorage.rol;
    if(this.identificador !== 1){
      this.administrador = true;
    }else {
      this.empleado = true;
    }

  }

  //
  private getItemsEmpresas(): void {

    this.permiso = new PermisoModel();
    // this.login.authUser.rolId;
    this.permiso.rolId = localStorage.rol;
    this.menu.loadMenus(this.permiso).subscribe(res => {
        console.log("======================= PERMISOS Empleados: ==============");

        console.log(this.menus = res);
        for (let menu of this.menus) {
            //this.items = menu.item;
            if (menu.menu.descripcion === "Empleados") {
                this.items = menu;
                console.log(this.items);

                if (this.items.crear === 1) {
                    this.crear = true;
                }
            }

        }

    }, (error) => {
        console.log(error);

    });
}
  
}
