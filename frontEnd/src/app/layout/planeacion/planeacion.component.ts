import { LoginService } from './../../login/servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import {FileUploaderComponent} from './file-uploader.component';
import { PlaneacionModel } from '../../model/planeacion.model';
import { OK } from '../../messages/httpstatus';
import { PlaneacionService } from './planeacion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/guard/auth.service';
import swal from 'sweetalert2';
import { PermisoModel } from '../../model/permiso.model';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';
import { ProyectoModel } from '../../model/proyectos';
import { ProyectosService } from '../proyectos/proyectos.service';
import { EpicaModel } from '../../model/epica.model';
import { RequerimientoModel } from '../../model/requerimiento.model';
import { RequestService } from '../request/request.service';
import { EpicService } from '../request/modal-q/template/epic/epic.service';


@Component({
    selector: 'app-planeacion',
    templateUrl: './planeacion.html',
    styleUrls: ['./planeacion.scss'],
    animations: [routerTransition()],
    providers: [PlaneacionService, LoginService, EnterpriseService, ProyectosService, RequestService, EpicService]
})
export class PlaneacionComponent implements OnInit   {

    //Variables--------------------------------------------


    items: any;
    menus: any;

    icon: string = "fa fa-caret-left";
    message: string;

    stateExpand: number = 1;

    crear = false;
    editar = false;
    eliminar = false;
    leer = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;
    disabledEnterprise: boolean = false;
    disabledProyecto: boolean = false;
    disabledRequerimiento: boolean = false;
    disabledEpica: boolean = false;
    private isValid: boolean = true;

    filterPr: ProyectoModel[];
    filterRq: RequerimientoModel[];
    planeaciones = [];
    private enterprises2: EnterpriseModel[];
    private proyectos: ProyectoModel[];
    private requerimientos: RequerimientoModel[];
    private epicas: EpicaModel[];
    private enterprises: EnterpriseModel[];
    
    private planeacionForm: PlaneacionModel;
    private permiso: PermisoModel;

    filter: PlaneacionModel = new PlaneacionModel();


    
    //Metodo Constructor      
    constructor(
        private planeacionService: PlaneacionService,
        private enterpriseService: EnterpriseService,
        private proyectoService: ProyectosService,
        private requestService: RequestService,
        public epicService : EpicService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService,
        private menu: LoginService,
        private session: AuthService
    ) 
    {

        this.planeacionForm = new PlaneacionModel();
        this.enterprises = [];
        this.proyectos = [];

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId); 

        }

        
    }


    //Metodo inicializador
    ngOnInit() {
        this.loadPlaneacion();
        this.getItemsPlaneacion();
        this.loadEnterprises();
    }


    //Metodo que controla el componente que permite crear historias 
    createHide() {

        this.disabledEnterprise = false;
        this.disabledProyecto = false;
        this.disabledRequerimiento = false;
        this.disabledEpica = false;

        console.log(this.stateExpand);

        if( this.stateExpand === 3 ){

            this.planeacionForm = new PlaneacionModel();
            this.stateExpand = 2;
            this.deleteFormHide = false;

        }else if( this.stateExpand === 1 ){

            this.visible = !this.visible;

            if(this.visible === true){

                this.icon = "fa fa-caret-down";

            }else{

                this.icon= "fa fa-caret-left";

            }

            this.stateExpand = 2

        }else
        if( this.stateExpand === 2 ){

            this.visible = !this.visible;

            if(this.visible === true){

                this.icon = "fa fa-caret-down";

            }else{

                this.icon= "fa fa-caret-left";

            }
            this.stateExpand = 1
        }

    }

    //Metodo que permite obtenes información sobre los items que aplican sobre la pantalla
    private getItemsPlaneacion(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            console.log("======================= PERMISOS Planeacion: ==============");
            console.log(this.menus = res);

            for (let menu of this.menus) {

                if (menu.menu.descripcion === "Planeacion") {
                    this.items = menu;
                    console.log("===============ITEMS PLANEACION:======================")
                    console.log(this.items);

                    if (this.items.crear === 1) {
                        this.crear = true;
                        console.log("==============CREAR: " + this.crear);
                    }

                    if (this.items.editar === 1) {
                        this.editar = true;
                        console.log("==============EDITAR: " + this.editar);
                    }

                    if (this.items.eliminar === 1) {
                        this.eliminar = true;
                        console.log("==============ELIMINAR: " + this.eliminar);
                    }

                    if (this.items.leer === 1) {
                        this.leer = true;
                        console.log("==============LEER: " + this.leer);
                    }

                }
            }
        }, (error) => {

            console.log(error);

        });
    }

    //Metodo que permite cargar todas las planeaciones para ser mostradas en la tabla de la pantalla
    private loadPlaneacion(): void {

        this.planeacionService.getAll().subscribe(res => { //Utilizando el servicio
 
             this.planeaciones = res;
 
             console.log(res);
             console.log(this.planeacionForm);
        
         },(error)=>{ //Controlando posible error
 
             console.log(error);
             this.toastr.error("Error al cargar los datos");
 
         });
    }

    //Metodo que permite cargar todos lo clientes(Empresas)
    private loadEnterprises(): void {
        this.enterprises = [];
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;
        },(error)=>{
            console.log(error);
  
            this.toastr.error("Error al cargar los datos de Empresa");
        });
    }

    //Metodo que permite obtener todos los proyectos de un cliente
    private getProyectosByCliente(id: any){

        this.proyectos = [];
        this.enterprises2 = this.enterprises.filter(value => value.id === parseInt(id));

        this.proyectoService.getProyectoByCliente(id).subscribe(res => {
            this.proyectos= res;

            this.planeacionForm.proyecto = new ProyectoModel();
            this.planeacionForm.requerimiento = new RequerimientoModel();
            this.planeacionForm.epica = new EpicaModel();
            this.planeacionForm.clienteId=id;
            this.planeacionForm.proyectoId = null;
            this.planeacionForm.requerimientoId = null;
            this.planeacionForm.epicaId = null;

            if(this.proyectos.length == 0){
                this.toastr.warning('No existen proyectos para este cliente');
            }


            
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos de Proyectos");

        });

        
    }
    

    //Metodo que permite obtener los requerimientos segun el proyecto
    private getRequerimientosByProyecto(id: any){ 

        this.requerimientos = [];
        this.planeacionForm.requerimiento = new RequerimientoModel();

        this.filterPr = this.proyectos.filter(value => value.id === parseInt(id));
        
    
        this.requestService.getRequestByProject(id).subscribe(res => {
            this.requerimientos= res;

            this.planeacionForm.requerimiento = new RequerimientoModel();
            this.planeacionForm.requerimientoId = null;
            this.planeacionForm.epicaId = null;
            this.epicas = [];

            if(this.requerimientos.length == 0){
                this.toastr.warning('No existen Requerimientos para este proyecto');
            }
            
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos de Requerimientos");

        });

        
        
    }

    //Metodo que permite obtener las epicas según el requerimiento
    private getEpicasByRequerimiento(id: any){ 

        this.epicas = [];
        this.planeacionForm.epica = new EpicaModel();

        this.filterRq = this.requerimientos.filter(value => value.id === parseInt(id));
        
    
        this.epicService.getEpicasByRequerimiento(id).subscribe(res => {
            this.epicas= res;
            this.planeacionForm.epica = new EpicaModel();
            this.planeacionForm.epicaId = null;

            if(this.epicas.length == 0){
                this.toastr.warning('No existen Epicas para este requerimiento');
            }
            
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos de Epicas");
 
        });

        
        
    }


    //Metodo que permite guardar una historia en la planeacion
    save():void{

        
        console.log(this.planeacionForm);
        this.deleteFormHide = false;

        if(this.login.authUser !== undefined){
            if(this.planeacionForm.id === null){
                this.planeacionForm.usuarioCreacion=this.login.authUser.usuarioId;
            }else{
                this.planeacionForm.usuarioModificacion =this.login.authUser.usuarioId;
            }
        }

        this.isValid = this.validate(this.planeacionForm);

        if (this.isValid) {

            this.planeacionService.saveOrUpdate(this.planeacionForm).subscribe(res => {
                
            // if (res.responseCode == OK) {
            this.loadPlaneacion(); //actualiza los datos que se visualizan en la tabla donde se muestran todos los empleados
            this.planeacionForm = new PlaneacionModel();
            this.toastr.success('Transacción satisfactoria', 'Gestión Planeacion');

        },(error)=>{ //Controlando posible error

            console.log(error);

            this.toastr.error(error.error.message,"Error en la transacción");
            
        });

        } else {

            this.message= 'Los campos con * son obligatorios!';

        }

        this.disabledEnterprise = false;
        this.disabledProyecto = false;
        this.disabledRequerimiento = false;
        this.disabledEpica = false;
        this.loadEnterprises();
    }
    
    
    //Metodo que valida los campos requeridos
    public validate(planeacionForm: PlaneacionModel): boolean {
        let isValid = true;

        if(!planeacionForm.clienteId){
           isValid = false;
        }
        if(!planeacionForm.proyectoId){
            isValid = false;
            console.log("numero documento");
         }
         if(!planeacionForm.requerimientoId){
            isValid = false;
            console.log("nombres");
         }
         if(!planeacionForm.epicaId){
            isValid = false;
            console.log("apellidos");
         }
         if(!planeacionForm.titulo){
            isValid = false;
            console.log("clienteId");
         }

        return isValid;
      }
    
      //Metodo que permite eliminar una historia a la planeacion
      delete(model){


        if(this.login.authUser !== undefined){

            model.usuarioCreacion=this.login.authUser.usuarioId;
        }

        swal({
            title: 'Esta seguro?',
            text: "El registro eliminado no podrá ser recuperado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            if(result.value){

                this.planeacionService.delete(model).subscribe(res=>{
                    // if (res.responseCode == OK) {
                    this.loadPlaneacion();//actualiza los datos que se visualizan en la tabla donde se muestran todos los empleados

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Gestión de Planeación');

            
                    this.planeacionForm = new PlaneacionModel();

                    this.deleteFormHide= false;

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

        this.disabledEnterprise = false;
        this.disabledProyecto = false;
        this.disabledRequerimiento = false;
        this.disabledEpica = false;

        this.loadEnterprises();
    }

    //Metodo que permite actualizar información de una historia en la planeacion
    upload(model){
        
        console.log(model);

        console.log(this.stateExpand);

        if( this.stateExpand === 1 ){

            this.visible = !this.visible;

            if(this.visible === true){
                this.icon = "fa fa-caret-down";

                this.deleteFormHide = false;
            }else{
                this.icon= "fa fa-caret-left";
            }

            this.disabledEnterprise = true;
            this.disabledProyecto = true;
            this.disabledRequerimiento = true;
            this.disabledEpica = true;
            this.deleteFormHide = true;
            this.planeacionForm = model;
            this.planeacionForm.clienteId = model.cliente.id;
            this.planeacionForm.proyectoId = model.proyecto.id;
            this.planeacionForm.requerimientoId = model.requerimiento.id;
            this.planeacionForm.epicaId = model.epica.id;
            this.enterprises = [];
            this.enterprises.push(this.planeacionForm.cliente);
            this.proyectos = [];
            this.proyectos.push(this.planeacionForm.proyecto);
            this.requerimientos = [];
            this.requerimientos.push(this.planeacionForm.requerimiento);
            this.epicas = [];
            this.epicas.push(this.planeacionForm.epica);
            this.stateExpand = 3;

        }else if( this.stateExpand === 2 || this.stateExpand === 3 ){

                this.disabledEnterprise = true;
                this.disabledProyecto = true;
                this.disabledRequerimiento = true;
                this.disabledEpica = true;
                this.deleteFormHide = true;
                this.planeacionForm = model;
                this.planeacionForm.clienteId = model.cliente.id;
                this.planeacionForm.proyectoId = model.proyecto.id;
                this.planeacionForm.requerimientoId = model.requerimiento.id;
                this.planeacionForm.epicaId = model.epica.id;
                this.enterprises = [];
                this.enterprises.push(this.planeacionForm.cliente);
                this.proyectos = [];
                this.proyectos.push(this.planeacionForm.proyecto);
                this.requerimientos = [];
                this.requerimientos.push(this.planeacionForm.requerimiento);
                this.epicas = [];
                this.epicas.push(this.planeacionForm.epica);
                this.stateExpand = 3;
                this.deleteFormHide = true;
        }

    }

      

  };

      
