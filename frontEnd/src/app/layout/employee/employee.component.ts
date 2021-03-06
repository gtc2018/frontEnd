import { LoginService } from './../../login/servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import {FileUploaderComponent} from './file-uploader.component';
import { EmployeeModel } from '../../model/employee';
import { OK } from '../../messages/httpstatus';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/guard/auth.service';
import swal from 'sweetalert2';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';
import { PermisoModel } from '../../model/permiso.model';
import { AreaModel } from '../../model/area.model';
import { AreaService } from '../areas/servicios/area.service';
import { CargoService } from '../cargos/servicios/cargo.service';
import { CargoModel } from '../../model/cargo.model';
import { DaneService } from '../dane/dane.service';
import { DaneModel } from '../../model/dane.model';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalQComponent } from './modal-q/modal-q.component';
import { SystemComponent } from './modal-q/template/system/system';
import { ToolComponent } from './modal-q/template/tool/tool';
import { CreateDetailComponent } from './modal-q/template/create-detail/create-detail';


@Component({
    selector: 'app-employee',
    templateUrl: './employee.html',
    styleUrls: ['./employee.scss'],
    animations: [routerTransition()],
    providers: [EmployeeService, LoginService, AreaService, CargoService, DaneService,EnterpriseService]
})
export class EmployeeComponent implements OnInit   {

    enterprises: EnterpriseModel[];
    paises: DaneModel[];
    departamentos: DaneModel[];
    ciudades: DaneModel[];
    areas: AreaModel[];
    cargos: CargoModel[];
    message: string;
    imagenTemp: string ="";
    file: File = null;
    public empresaId: Number;

    user: any;
    items: any;
    menus: any;
    private permiso: PermisoModel;

    crear = false;
    editar = false;
    eliminar = false;
    leer = false;

    //Metodos principales---------------------
    constructor(private employeeService: EmployeeService,
        private enterpriseService: EnterpriseService,
        private modalService : NgbModal,
        private daneService: DaneService,
        private areaService: AreaService,
        private cargoService: CargoService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService,
        private menu: LoginService,
        private session: AuthService
    ) {

        this.employeeForm = new EmployeeModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.email);

        }

        this.employeeForm.foto = 'assets/images/avatar.png';

    }


    ngOnInit() {
        this.getItemsEmpresas();
        this.loadEmployee();
        this.loadEnterprises();
        this.loadAreas();
        this.loadCargos();
        this.loadCountry();
    }

    //Variables--------------------------------------------


    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';
    fotoEmpresa: string = 'assets/images/logo.png';
    fotoEmpleado: string = 'assets/images/avatar.png';
    imagen: string;
    email: string;
    cedula:string;

    stateExpand: number = 1;
    identificador: number = 0;
    employeeIden:number = 0;
    emailIden:number = 0;
    fotoIden:number = 0;

    emailRegex: RegExp;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;
    modal: boolean = false;

    employeeForm: EmployeeModel;
    employeeCom: EmployeeModel[];
    employee= [];

    filter: EmployeeModel = new EmployeeModel();
    filterEn: EnterpriseModel[];
    private isValid: boolean = false;

        // Funciones---------------------------------------------------------------

        deleteForm(model){
            if(this.login.authUser !== undefined){

                model.usuarioCreacion=this.login.authUser.email;
                }

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

                    this.employeeService.delete(model).subscribe(res=>{
                        // if (res.responseCode == OK) {
                            this.loadEmployee();

                            this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empleados');

                            // swal(
                            //     'Deleted!',
                            //     'Your file has been deleted.',
                            //     'success'
                            //   )

                            this.employeeForm = new EmployeeModel();

                            this.employeeForm.foto = 'assets/images/avatar.png';

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

        private loadEmployee(): void {
            this.employeeService.getAll().subscribe(res => {
                this.employee = res;
                console.log(this.employee);
            },(error)=>{
                console.log(error);

                this.toastr.error("Error al cargar los datos");
                // swal(
                //     'Error',
                //     error.error.message,
                //     'error'
                //   )
            });
        }

        //Cambio de estado

    changeState(model){

        if (this.login.authUser !== undefined) {

            model.usuarioCreacion = this.login.authUser.email;
        }

        if (model.estado === true) {
            model.estado = 1;
        } else {
            model.estado = 0;
        }

        console.log(model);

        model.clienteId = model.cliente.id;
        model.areaId = model.area.id;
        model.cargoId = model.cargo.id;

        if(this.file !==null && this.file.name !==null){
            this.employeeForm.foto = this.file.name;
            } 

        this.employeeService.saveOrUpdate(model).subscribe(res => {
            console.log(res);
            if (res.responseCode == OK) {
                this.loadEmployee();
                this.toastr.success('Registro actualizado', 'Gestión de Empleados');
            } else {
                this.message = res.message;
            }

        }, (error) => {
            console.log(error);

            this.isValid = false;

            this.toastr.error("Error actualizar los datos");
        });
    }

    //Metodo de guardar 
    saveOrUpdate():void{

        if(this.employeeIden === 1){

            if(this.fotoIden === 1){

                if(this.file !==null && this.file.name !==null){
                    this.employeeForm.foto = this.file.name;
                }

            }

        }else{
            if(this.file !==null && this.file.name !==null){
                this.employeeForm.foto = this.file.name;
            }
        }

        this.employeeService.saveOrUpdate(this.employeeForm).subscribe(res => {

            this.loadEmployee();
            this.clean();
            this.toastr.success('Transacción satisfactoria, Ya se encuentra disponible la opcion InHouse', 'Gestión de Empleados');

        },(error)=>{

            this.toastr.error(error.error.message,"Error en la transacción");
        });

    }

    //Para antes de guardar
    save():void{

        if(this.employeeForm.id === null){
            this.employeeForm.usuarioCreacion = localStorage.email;
        }else{
            this.employeeForm.usuarioModificacion = localStorage.email;
            this.employeeIden = 1;
        }

        this.isValid = this.validate(this.employeeForm);

        if(this.isValid){

            this.employeeService.getEmployeeForRegistre(this.employeeForm.email, this.employeeForm.numeroDocumento).subscribe(res => {

                if(this.employeeIden === 1){

                    if(this.cedula === this.employeeForm.numeroDocumento){

                        if(this.email === this.employeeForm.email){
                            this.saveOrUpdate();
                            this.employeeIden = 0;
                        }else{

                            for(let e of res){

                                if(this.employeeForm.email === e.email){
                                    this.emailIden = 1;
                                }
                            }

                            if(this.emailIden === 1){

                                this.toastr.error("Ya se existe un registro con este email","Gestion de empleados");
                                this.emailIden = 0;

                            }else{

                                this.saveOrUpdate();
                            }
                        }

                    }else{
                        
                        for(let e of res){

                            if(this.employeeForm.numeroDocumento === e.numeroDocumento){
                                this.employeeIden = 3;
                            }
                        }

                        if(this.employeeIden === 3){

                            this.toastr.error("Ya se existe un registro con este numero de documento","Gestion de empleados");
                            this.employeeIden = 1;

                        }else if(this.email === this.employeeForm.email){

                            this.saveOrUpdate();
                        }else{

                            for(let e of res){

                                if(this.employeeForm.email === e.email){
                                    this.emailIden = 1;
                                }
                            }

                            if(this.emailIden === 1){

                                this.toastr.error("Ya se existe un registro con este email","Gestion de empleados");
                                this.emailIden = 0;

                            }else{

                                this.saveOrUpdate();
                            }
                        }
                    }

                }else if(res.length === 0){

                    this.saveOrUpdate();

                }else{
                    this.toastr.error("Ya se existe un registro con este email o numero de documento","Gestion de empleados");
                }

            }, (error) => {
                this.toastr.error("Error al cargar los datos de Empleado");            
            });

        }else{

            if(!this.messageEmail){
                this.message= 'Los campos con * son obligatorios!';
            }else{
                this.message= this.messageEmail;
                this.messageEmail= undefined;
            }
        }

        

        /*this.employeeService.getAll().subscribe(res => {
            this.employeeCom = res;

            for(let e of this.employeeCom){

                if (this.employeeForm.email === e.email){
                    this.employeeIden = 1;
                }
            }

            if(this.employeeForm.id !== null){
                this.employeeIden = 0;
            }else{
                this.employeeForm.estado = 1;
            }

            if(this.employeeIden !== 1){
                
                if(this.login.authUser !== undefined){
                    if(this.employeeForm.id === null){

                        this.employeeForm.usuarioCreacion=this.login.authUser.email;    
                    }else{
                        this.employeeForm.usuarioModificacion =this.login.authUser.email;
                    }
                            
                }

                this.isValid = this.validate(this.employeeForm);

                if (this.isValid) {
                        

                    if(this.file !==null && this.file.name !==null){
                    this.employeeForm.foto = this.file.name;
                    }   

                    this.employeeService.saveOrUpdate(this.employeeForm).subscribe(res => {
                        // if (res.responseCode == OK) {
                            this.loadEmployee();
                            this.clean();
                            this.toastr.success('Transacción satisfactoria', 'Gestión de Empleados');
                    },(error)=>{
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

            }else{
                this.toastr.error("Ya existe un registro con este email");
                this.employeeIden = 0;   
            }    

        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos");

        });*/

    }

    //Para cargar empresass

    private loadEnterprises(): void {
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;
        }, (error) => {
            this.toastr.error("Error al cargar los datos de Empresa");
            
        });
    }

    //Para cargar paises
    private loadCountry(): void {
        this.daneService.getCountry().subscribe(res => {
            this.paises = res;
        }, (error) => {
            this.toastr.error("Error al cargar los datos de Pais");
            
        });
    }

    //Para cargar departamentos por pais
    private filterDeparmentForCountry(id:any): void {

        if(this.identificador === 1){

        }else{

            this.employeeForm.departamento = undefined;
            this.employeeForm.ciudad = undefined;
        }

        

        this.daneService.getDeparment(id).subscribe(res => {
            this.departamentos = res;
        }, (error) => {
            this.toastr.error("Error al cargar los datos de Departamento");
            
        });
    }

    //Para cargar ciudades por departamento
    private filtercityForDeparment(id:any): void {
        if(this.identificador === 1){

        }else{

            this.employeeForm.ciudad = undefined;
        }
        
        this.daneService.getCity(id).subscribe(res => {
            this.ciudades = res;
        }, (error) => {
            this.toastr.error("Error al cargar los datos de Ciudad");
            
        });
    }

    //Para cargar areas

    private loadAreas(): void {
        this.areaService.getAreas().subscribe(res => {
            this.areas = res;

        }, (error) => {
            console.log(error);
            this.toastr.error("Error al cargar los datos de Area");
        });
    }

    //Para cargar cargos

    private loadCargos(): void {
        this.cargoService.getCargos().subscribe(res => {
            this.cargos = res;

        }, (error) => {
            console.log(error);
            this.toastr.error("Error al cargar los datos de Cargos");
        });
    }

        //Para eliminar

        delete(model){

            if(this.login.authUser !== undefined){

            model.usuarioCreacion=this.login.authUser.email;
            }

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

                this.employeeService.delete(model).subscribe(res=>{
                    // if (res.responseCode == OK) {
                        this.loadEmployee();

                        this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empleados');

                        // swal(
                        //     'Deleted!',
                        //     'Your file has been deleted.',
                        //     'success'
                        //   )
                        this.employeeForm = new EmployeeModel();

                        this.employeeForm.foto = 'assets/images/avatar.png';

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

        clean(){

            this.employeeForm = new EmployeeModel();
            this.areas = null;
            this.cargos = null;
            this.employeeIden = 0;
            this.emailIden = 0;
            this.modal = false;
            this.fotoIden = 0;
            this.email = undefined;
            this.cedula = undefined;

            this.deleteFormHide = false;

            this.employeeForm.foto = 'assets/images/avatar.png';
            this.fotoEmpresa = 'assets/images/logo.png';
        }

    // se filtran los cargos y areas segun la empresa seleccionada
    filterChargeAndAreaToEnterprise(id: any): void{

        /*if(this.identificador === 0){

            this.usuario = new UsuarioModel();

        this.confirm = "";

        this.fotoEmpleado = 'assets/images/avatar.png';

        }*/
   
        console.log(id);

        this.filterEn = this.enterprises.filter(value => value.id === parseInt(id));

        console.log(this.filterEn);

        this.fotoEmpresa = this.filterEn[0].imagenEmpresa;

        this.employeeForm.clienteId = id;

        this.cargoService.getChargeToEnterprise(id).subscribe(res => {   
      
            this.cargos = res;
      
          },(error)=>{
          
            this.toastr.error("Error al cargar los datos");
          });

        this.areaService.getAreaToEnterprise(id).subscribe(res => {   
      
            this.areas = res;
      
          },(error)=>{
          
      
            this.toastr.error("Error al cargar los datos");
          });  

       }

        upload(model){

            if( this.stateExpand === 1 ){
                this.visible = !this.visible;

            if(this.visible === true){
                this.icon = "fa fa-caret-down";
                this.employeeForm = model;
                this.employeeForm.clienteId = this.employeeForm.cliente.id;
                this.employeeForm.areaId = this.employeeForm.area.id;
                this.employeeForm.cargoId = this.employeeForm.cargo.id;
                this.fotoEmpresa = this.employeeForm.cliente.imagenEmpresa;
                this.fotoEmpleado = this.employeeForm.foto;
                this.email = this.employeeForm.email;
                this.cedula = this.employeeForm.numeroDocumento;
                this.identificador = 1;
                this.filterDeparmentForCountry(this.employeeForm.pais);
                this.filtercityForDeparment(this.employeeForm.departamento);
                this.modal = true;

            this.filterChargeAndAreaToEnterprise(this.employeeForm.clienteId);

                this.deleteFormHide = false;
            }else{
                this.icon= "fa fa-caret-left";
            }
            this.deleteFormHide = true;

            this.employeeForm = model;
            this.stateExpand = 3;

            }else if( this.stateExpand === 2 || this.stateExpand === 3 ){
                this.employeeForm = model;

                this.employeeForm.clienteId = this.employeeForm.cliente.id;
                this.employeeForm.areaId = this.employeeForm.area.id;
                this.employeeForm.cargoId = this.employeeForm.cargo.id;
                this.fotoEmpresa = this.employeeForm.cliente.imagenEmpresa;
                this.fotoEmpleado = this.employeeForm.foto;
                this.email = this.employeeForm.email;
                this.cedula = this.employeeForm.numeroDocumento;
                this.identificador = 1;
                this.stateExpand = 3;
                this.filterDeparmentForCountry(this.employeeForm.pais);
                this.filtercityForDeparment(this.employeeForm.departamento);
                this.modal = true;

                this.deleteFormHide = true;

                this.filterChargeAndAreaToEnterprise(this.employeeForm.clienteId);
                
            }

               }

               //Para mostrar el crear o no

        createHide() {

            if( this.stateExpand === 3 ){

                this.employeeForm = new EmployeeModel();

                this.employeeForm.foto = 'assets/images/avatar.png';

                this.stateExpand = 2;

                this.deleteFormHide = false;
                this.clean();

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

    // Mostrar el modal o no
    inHouse() {

        const modalRef = this.modalService.open(ModalQComponent,{size:"lg"});
        modalRef.componentInstance.title = 'Recursos In-House';
        // modalRef.componentInstance.seleccionados = 'las herramientas';
        modalRef.componentInstance.template = `create-detail`;
        modalRef.componentInstance.empleadoId = this.employeeForm.id;

        
    }

    //Validación de campos

    public validate(employeeForm: EmployeeModel): boolean {
        let isValid = true;
        console.log(employeeForm.tipoEmpleado);
        if(!employeeForm.tipoEmpleado){
           isValid = false;
        }
        if(!employeeForm.tipoDocumento){
           isValid = false;
        }
        if(!employeeForm.numeroDocumento){
            isValid = false;
         }
         if(!employeeForm.nombres){
            isValid = false;
         }
         if(!employeeForm.apellidos){
            isValid = false;
         }
         if(!employeeForm.clienteId){
            isValid = false;
         }
         if(!employeeForm.cargoId){
            isValid = false;
         }
         if(!employeeForm.sueldo){
            isValid = false;
         }
         if(!employeeForm.direccion){
            isValid = false;
         }
         if(!employeeForm.email){

            isValid = false;

            this.messageEmail = undefined;

         }else{
            this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (this.emailRegex.test(employeeForm.email)) {
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
            this.fotoIden = 1;

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
            this.employeeForm.foto = reader.result;
            this.imagenTemp =  reader.result;
            this.employeeForm.imagen = this.imagenTemp.split(/,(.+)/)[1];
        }

      };


