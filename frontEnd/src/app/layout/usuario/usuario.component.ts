import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearUsuarioService } from './servicios/crear-usuario.service';
import { Router } from '@angular/router';
import { UsuarioModel } from './../../model/usuario/usuario.model';

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsuarioService } from './servicios/usuario.service';
import { OK } from '../../messages/httpstatus';
import swal from 'sweetalert2'
import { AuthService } from '../../shared/guard/auth.service';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';
import { ProyectosService } from '../proyectos/proyectos.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()],
    providers: [UsuarioService, CrearUsuarioService, EnterpriseService, ProyectosService]
})
export class UsuarioComponent implements OnInit {
    confirm: any;

    msgConfirm: string = "No concuerda con la contraseña";

    hideConfirm: boolean = false;

    stateExpand: number = 1;

    deleteFormHide: boolean;

    // Variables
    emailRegex: RegExp;
    messageEmail: any;
    user: any;

    private usuarios: Array<UsuarioModel>;
    private usuario: UsuarioModel;
    private isValid: boolean = true;
    private message: string = "";
    private enterprises: EnterpriseModel[];

//Mostrar el crear o no

    visible = false;

    //Icono del boton

    icon: string= "fa fa-caret-left";

    toggleDivCreateUsers() {
        console.log(this.stateExpand);

        if( this.stateExpand === 3 ){

            this.usuario = new UsuarioModel();

            this.usuario.fotoEmpresa = 'assets/images/logo.png';
            this.usuario.fotoEmpleado = 'assets/images/avatar.png';

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

    //DatePick
    // public myDatePickerOptions: IMyDpOptions = {
    //     // other options...
    //     dateFormat: 'dd.mm.yyyy',
    // };

    public model: any = { date: { year: 2018, month: 10, day: 9 } };

    constructor(
        private proyectoService: ProyectosService,
        private enterpriseService: EnterpriseService,
        private usuarioService: UsuarioService,
        private crearUsuarioService: CrearUsuarioService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService
    ) {

        this.usuario = new UsuarioModel();
        this.usuario.fotoEmpleado = "assets/images/avatar.png";
        this.usuario.fotoEmpresa = "assets/images/logo.png";

        if (sessionStorage.getItem("usuario")) {
            this.user = JSON.parse(sessionStorage.getItem("usuario"));

            console.log(this.user);

            this.usuario.usuarioCreacion = this.user.usuarioId;

        } else {
            this.user = new UsuarioModel();
        }
        //this.usuario = new UsuarioModel();
      }

    ngOnInit() {
        this.loadUsuarios();
        this.loadEnterprises()
    }

    //Para eliminar desde el formulario
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

            this.usuarioService.delete(model).subscribe(res=>{
                // if (res.responseCode == OK) {
                    this.loadUsuarios();

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empresas');

                    // swal(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )

                    this.usuario = new UsuarioModel();
        this.usuario.fotoEmpleado = "assets/images/avatar.png";
        this.usuario.fotoEmpresa = "assets/images/logo.png";


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

    setNew(id: any): void {
        console.log(id);

            //  this.filterEn = this.enterprises.filter(value => value.id === parseInt(id));

            //  console.log(this.filterEn[0]);

            this.usuario.empresaId = id;

            // this.proyectoService.getAllUsuariosByEmpresaId(id).subscribe(res => {

            //     console.log(res);

            //     this.usuarios = res;

            // },(error)=>{

            //     console.log(error);

            //     this.toastr.error("Error actualizar los datos");

            // });

        }

    //Para cargar empresass

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

    comparate(model){

        console.log(model);

        console.log(model.password.length);

        if(model.password.length === this.confirm.length){

            console.log("hola");

            if(model.password !== this.confirm){

                console.log("holaBien");

                this.hideConfirm=true;

            }else{
                this.hideConfirm=false;
            }
        }else{
            this.hideConfirm=false;
        }

    }


    //Metodo para eliminar el registro

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

            this.usuarioService.delete(model).subscribe(res=>{
                // if (res.responseCode == OK) {
                    this.loadUsuarios();

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Empresas');

                    // swal(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )
                    this.usuario = new UsuarioModel();
        this.usuario.fotoEmpleado = "assets/images/avatar.png";
        this.usuario.fotoEmpresa = "assets/images/logo.png";


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

    /**
     * Metodo consultar todos los usuarios.
     */
    private loadUsuarios(): void {
        this.usuarioService.getUsuarios().subscribe(res => {
            this.usuarios = res;

            console.log(res);

        },(error)=>{
            // this.isValid = false;

            console.log(error);

            this.toastr.error(this.message ,"Error al cargar los datos");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
            this.usuario = new UsuarioModel();

            this.usuario.fotoEmpresa = 'assets/images/logo.png';
            this.usuario.fotoEmpleado = 'assets/images/avatar.png';
        });

    }


    /**
     * Metodo guardar o actualizar
     */
    public saveOrUpdate(): void {
        if(this.login.authUser !== undefined){

            this.usuario.usuarioCreacion=this.login.authUser.usuarioId;
            }
        this.isValid = this.validate(this.usuario);

        if (this.isValid) {

            this.crearUsuarioService.saveOrUpdate(this.usuario).subscribe(res => {
                // if (res.responseCode == OK) {
                    // console.log(this.router.navigate(['/usuarios']));
                    this.loadUsuarios();
                    this.usuario = new UsuarioModel();
                     this.toastr.success('Transacción satisfactoria', 'Gestión de Empresas');
        // console.log(this.router.url);

        //         } else {
        //             this.message = res.message;
        //             this.isValid = false;
        //         }

            },(error)=>{
                console.log(error);

                if(error.error.message !== undefined){

                    this.message = error.error.message;

                }else{

                    this.message = error.message;
                }


                // this.isValid = false;

                this.toastr.error(this.message ,"Error en la transacción");
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

    //Método para actualizar el estado de un usuario

    changeState(model): void{

        if(this.login.authUser !== undefined){

            model.usuarioCreacion=this.login.authUser.usuarioId;
            }

        if (model.estado === true){
            model.estado = 1;
        }else{
            model.estado = 0;
        }

        console.log(model);

        this.crearUsuarioService.saveOrUpdate(model).subscribe(res => {
            if (res.responseCode == OK) {
                this.loadUsuarios();
                this.toastr.success('Registro actualizado', 'Gestión de Usuarios');
            } else {
                this.message = res.message;
            }
        },(error)=>{
            console.log(error);

            this.isValid = false;

            this.toastr.error("Error actualizar los datos");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });
    }

    /**
     * Metodo editar usuarios:
     */

    public edit(model): void {

        console.log(model);

        this.confirm = model.password;

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

        this.usuario = model;
        this.stateExpand = 3;

        }else if( this.stateExpand === 2 || this.stateExpand === 3 ){
            this.usuario = model;
            this.stateExpand = 3;
            this.deleteFormHide = true;
        }

    }

    public validate(usuario: UsuarioModel): boolean {
        let isValid = true;

        if(!usuario.apellidos){
           isValid = false;
        }
        if(!usuario.email){
           isValid = false;

            this.messageEmail = undefined;
        }else{
            this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (this.emailRegex.test(usuario.email)) {
                console.log("correcto");
                this.messageEmail = undefined;
              } else {
                console.log("incorrecto");
                this.messageEmail = "Por favor digite un formato de email válido";
              }
         }
        if(!usuario.telefono){
           isValid = false;
        }
        if(!usuario.rolId){
           isValid = false;
        }
        if(!usuario.password){
           isValid = false;
        }

        return isValid;
      }

}
