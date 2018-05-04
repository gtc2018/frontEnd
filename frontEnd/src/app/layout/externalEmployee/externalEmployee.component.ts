import { LoginService } from './../../login/servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import {FileUploaderComponent} from './file-uploader.component';
import { ExternalEmployeeModel } from '../../model/externalEmployee';
import { OK } from '../../messages/httpstatus';
import { ExternalEmployeeService } from './externalEmployee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/guard/auth.service';
import swal from 'sweetalert2';
import { PermisoModel } from '../../model/permiso.model';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';


@Component({
    selector: 'app-employeeE',
    templateUrl: './externalEmployee.html',
    styleUrls: ['./externalEmployee.scss'],
    animations: [routerTransition()],
    providers: [ExternalEmployeeService, LoginService, EnterpriseService]
})
export class ExternalEmployeeComponent implements OnInit   {

    //Variables--------------------------------------------

    messageEmail: string; 
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';
    imagenTemp: string ="";
    message: string;

    user: any;
    items: any;
    menus: any;

    stateExpand: number = 1;

    emailRegex: RegExp;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;
    crear = false;
    editar = false;
    eliminar = false;
    leer = false;
    private isValid: boolean = true;

    externalEmployeeForm: ExternalEmployeeModel;
    externalEmployee= [];
    filter: ExternalEmployeeModel = new ExternalEmployeeModel();
    private enterprises: EnterpriseModel[];
    private permiso: PermisoModel;

    file: File = null;
    

    
    //Metodo Constructor      
    constructor(
        private employeeService: ExternalEmployeeService,
        private enterpriseService: EnterpriseService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService,
        private menu: LoginService,
        private session: AuthService
    ) 
    {

        this.externalEmployeeForm = new ExternalEmployeeModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId); 

        }

        this.externalEmployeeForm.fotoEmpleado = 'assets/images/avatar.png';
    }


    //Metodo inicializador
    ngOnInit() {
        this.loadEmployee();
        this.getItemsEmpleadosExternos();
        this.loadEnterprises();
    }
    

    //Metodo loeadEmployee: Permite cargar obtener informacion de empleados externos que se encuentran en la BD
    private loadEmployee(): void {

       this.employeeService.getAll().subscribe(res => { //Utilizando el servicio

            this.externalEmployee = res;

            console.log(res);
            console.log(this.externalEmployeeForm);
       
        },(error)=>{ //Controlando posible error

            console.log(error);
            this.toastr.error("Error al cargar los datos");

        });
    }


    //Metodo setNew: Setea el valor del clienteId(Empresa) al cual pertenece el empleado
    setNew(id: any): void {

            this.externalEmployeeForm.clienteId = id;
    }


    //Metodo loadEnterprise: Carga el listado de las empresas que se encuentran en la BD
    private loadEnterprises(): void {
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;
            console.log(this.enterprises);
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos de Empresa");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });
    }


    
    //Metodo changeState: Cambio de estado del empleado (Activo/Inactivo) y actualizacion de dato en la BD
    changeState(model){

        console.log(model);

        if(this.login.authUser !== undefined){

            model.usuarioCreacion=this.login.authUser.usuarioId;

        }

        
        if (model.estado === true){
            model.estado = 1;
        }else{
            model.estado = 0;
        }
        
        // console.log(model);

        this.employeeService.saveOrUpdate(model).subscribe(res => {
            if (res.responseCode == OK) {
                this.loadEmployee();
                this.toastr.success('Registro actualizado', 'Gestión de Empleados');
            } else {
                this.message = res.message;
            }
        },(error)=>{
            console.log(error);

            this.isValid = false;

            this.toastr.error(error.error.message,"Error actualizar los datos");
 
        });
    }

    
    
    //Metodo Save: Guarda datos del empleado externo en la BD
    save():void{


        console.log(this.externalEmployeeForm);


        if(this.login.authUser !== undefined){
            this.externalEmployeeForm.usuarioCreacion=this.login.authUser.usuarioId;
        }

        this.isValid = this.validate(this.externalEmployeeForm);

        if (this.isValid) {

            
            
            if(this.file !==null && this.file.name !==null){
                this.externalEmployeeForm.fotoEmpleado = this.file.name;
                }

            this.employeeService.saveOrUpdate(this.externalEmployeeForm).subscribe(res => {
                
            // if (res.responseCode == OK) {
            this.loadEmployee(); //actualiza los datos que se visualizan en la tabla donde se muestran todos los empleados
            this.externalEmployeeForm = new ExternalEmployeeModel();
            this.externalEmployeeForm.fotoEmpleado = 'assets/images/logo.png';
            this.toastr.success('Transacción satisfactoria', 'Gestión de Empleados');

        },(error)=>{ //Controlando posible error

            console.log(error);

            this.toastr.error(error.error.message,"Error en la transacción");
            
        });

        } else {

            console.log(this.messageEmail);
             if(!this.messageEmail){
            this.message= 'Los campos con * son obligatorios!';

            }else{
                this.message= this.messageEmail;
                this.messageEmail= undefined;
            }
        }
    }

    
    
    //Metodo delete: Recibe un empleado externo y lo elimina en la BD

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
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {

            if(result.value){

                this.employeeService.delete(model).subscribe(res=>{
                    // if (res.responseCode == OK) {
                    this.loadEmployee();//actualiza los datos que se visualizan en la tabla donde se muestran todos los empleados

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empleados');

            
                    this.externalEmployeeForm = new ExternalEmployeeModel();
                    this.externalEmployeeForm.fotoEmpleado = 'assets/images/avatar.png';

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
    }

    
    
    //Metodo clean: Elimina los datos ingrsados en los campos del form
    clean(){ 

        this.externalEmployeeForm = new ExternalEmployeeModel();

        this.deleteFormHide = false;

        this.externalEmployeeForm.fotoEmpleado = 'assets/images/avatar.png';
    }



    //Metodo upload despliega el formulario y muestra los datos del empleado a actualizar en el formulario
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

            this.deleteFormHide = true;
            this.externalEmployeeForm = model;
            this.stateExpand = 3;

        }else if( this.stateExpand === 2 || this.stateExpand === 3 ){

                this.externalEmployeeForm = model;
                this.stateExpand = 3;
                this.deleteFormHide = true;
        }

    }



    //Metodo createHide: Muestra o oculta la seccion donde se encuentra el formulario de creacion de empleado externo
    
    createHide() {

        console.log(this.stateExpand);

        if( this.stateExpand === 3 ){

            this.externalEmployeeForm = new ExternalEmployeeModel();
            this.externalEmployeeForm.fotoEmpleado = 'assets/images/avatar.png';
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

            // this.stateExpand = true;
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



    //Metodo getItemsEmpresas: Maneja los permisos de los items sobre el modulo de empleados externos
    private getItemsEmpleadosExternos(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            console.log("======================= PERMISOS Empleados Externos: ==============");
            console.log(this.menus = res);

            for (let menu of this.menus) {
                    //this.items = menu.item;
                if (menu.menu.descripcion === "Empleados") {
                    this.items = menu;
                    console.log("===============ITEMS EMPRESAS:======================")
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

    

    //Metodo validate: Validación de campos requeridos
    public validate(externalEmployeeForm: ExternalEmployeeModel): boolean {
        let isValid = true;
        console.log(externalEmployeeForm.tipoEmpleado);
        if(!externalEmployeeForm.tipoDocumento){
           isValid = false;
           console.log("tipo documento");
        }
        if(!externalEmployeeForm.numeroDocumento){
            isValid = false;
            console.log("numero documento");
         }
         if(!externalEmployeeForm.nombres){
            isValid = false;
            console.log("nombres");
         }
         if(!externalEmployeeForm.apellidos){
            isValid = false;
            console.log("apellidos");
         }
         if(!externalEmployeeForm.clienteId){
            isValid = false;
            console.log("clienteId");
         }
         if(!externalEmployeeForm.cargoId){
            isValid = false;
            console.log("cargoId");
         }
         if(!externalEmployeeForm.email){

            isValid = false;
            console.log("email");

            this.messageEmail = undefined;

         }else{
            this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (this.emailRegex.test(externalEmployeeForm.email)) {
                console.log("correcto");
                this.messageEmail = undefined;
              } else {
                isValid = false;
                console.log("incorrecto");
                this.messageEmail = "Por favor digite un formato de email válido";
              }
         }

        return isValid;
      }
    

      // Para cargar la imagen
      handleDragEnter() {
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    handleInputChange(e){
        this.file = <File>e.target.files[0];
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file.name);

    var pattern = /image-*/;
    var reader = new FileReader();

    console.log(reader);

    if (!file.type.match(pattern)) {
        swal(
            'Error al cargar logo',
            'Por favor ingrese un formato válido de imagen',
            'error'
          );
        return;
    }

    // this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        var reader = e.target;

        console.log(reader.result);
        this.externalEmployeeForm.fotoEmpleado = reader.result;
        this.imagenTemp =  reader.result;
        this.externalEmployeeForm.imagen = this.imagenTemp.split(/,(.+)/)[1];
    }

  };

      
