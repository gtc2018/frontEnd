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


@Component({
    selector: 'app-employee',
    templateUrl: './employee.html',
    styleUrls: ['./employee.scss'],
    animations: [routerTransition()],
    providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit   {
    message: string;

    //Metodos principales---------------------
    constructor(private employeeService: EmployeeService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService) {

        this.employeeForm = new EmployeeModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);

        }

        this.employeeForm.foto = 'assets/images/avatar.png';

        // this.employee = [

        //     {id:1,
        //     name:"Santiago Carrillo",
        //     apellido:"Alzate Papá",
        //     document:"1144078370",
        //     telefono:"3754547",
        //     email:"santiagoca42@gmail.com",
        //     estado:'1',
        //     foto:'assets/images/Scan.jpg'},

        //     {id:2,
        //     name:"Santiago Carrillo",
        //     apellido:"Alzate Papá",
        //     document:"1144078370",
        //     telefono:"3754547",
        //     email:"santiagoca42@gmail.com",
        //     estado:'1',
        //     foto:'assets/images/avatar.png'}

        // ]

    }


    ngOnInit() {
        this.loadEmployee();
    }

    //Variables--------------------------------------------

    user: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';

    stateExpand: number = 1;

    emailRegex: RegExp;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;

    employeeForm: EmployeeModel;
    employee= [];

    filter: EmployeeModel = new EmployeeModel();
    private isValid: boolean = true;

        // Funciones---------------------------------------------------------------

        deleteForm(model){
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
                    confirmButtonText: 'Si, eliminar'
                  }).then((result) => {

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
                  })
        }

        private loadEmployee(): void {
            this.employeeService.getAll().subscribe(res => {
                this.employee = res;
                console.log(this.employeeForm);
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

        if(this.login.authUser !== undefined){

        model.usuarioCreacion=this.login.authUser.usuarioId;

        }

        if (model.estado === true){
            model.estado = 1;
        }else{
            model.estado = 0;
        }

        console.log(model);

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
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });
    }

        //Para guardar

    save():void{

        console.log(this.employeeForm);

        if(this.login.authUser !== undefined){
            this.employeeForm.usuarioCreacion=this.login.authUser.usuarioId;
        }

        this.isValid = this.validate(this.employeeForm);

        if (this.isValid) {

        delete this.employeeForm.foto;

        delete this.employeeForm.celular;

        this.employeeService.saveOrUpdate(this.employeeForm).subscribe(res => {
            // if (res.responseCode == OK) {
                this.loadEmployee();
                this.employeeForm = new EmployeeModel();
                this.employeeForm.foto = 'assets/images/avatar.png';
                this.toastr.success('Transacción satisfactoria', 'Gestión de Empleados');

        },(error)=>{
            console.log(error);

                this.toastr.error(error.error.message,"Error en la transacción");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
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

        //Para eliminar

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
                confirmButtonText: 'Si, eliminar'
              }).then((result) => {

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
              })

        }

        clean(){

            this.employeeForm = new EmployeeModel();

            this.deleteFormHide = false;

            this.employeeForm.foto = 'assets/images/avatar.png';
        }

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

            this.employeeForm = model;
            this.stateExpand = 3;

            }else if( this.stateExpand === 2 || this.stateExpand === 3 ){
                this.employeeForm = model;
                this.stateExpand = 3;
                this.deleteFormHide = true;
            }

               }

               //Para mostrar el crear o no

        createHide() {

            console.log(this.stateExpand);

            if( this.stateExpand === 3 ){

                this.employeeForm = new EmployeeModel();

                this.employeeForm.foto = 'assets/images/avatar.png';

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

            var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        console.log(file);

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
        }

      };
