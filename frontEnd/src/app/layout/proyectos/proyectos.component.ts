import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProyectoModel } from '../../model/proyectos';
import { ProyectosService } from './proyectos.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';
import { UsuarioService } from '../usuario/servicios/usuario.service';
import { UsuarioModel } from '../../model/usuario/usuario.model';
import swal from 'sweetalert2';
import { AuthService } from '../../shared/guard/auth.service';
import { EmployeeModel } from '../../model/employee';

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss'],
    animations: [routerTransition()],
    providers: [ProyectosService, EnterpriseService, UsuarioService]
})
export class ProyectosComponent implements OnInit {

    styleIconUpload: string = "";
    iconUpload: string = "fa-upload";
    nameUpload:string = "Subir Documento";
    dragging: boolean;
    //Variables
    filterEn: any;

    fotoDoc: string;

    private proyectos: ProyectoModel[];//Tabla
    private proyecto: ProyectoModel;//Form

    private enterprise: EnterpriseModel;
    private enterprises: EnterpriseModel[];

    private employees: EmployeeModel[];
    private userToEnterprise= [];

    private isValid: boolean = true;
    private message: string = "";

    //Mostrar el crear o no

    visible = false;

    //Icono del boton

    icon: string= "fa fa-caret-left";

    //Métodos y funciones

    constructor(private enterpriseService: EnterpriseService,
        private proyectoService: ProyectosService,
        private usuarioService: UsuarioService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService) {

            this.proyecto = new ProyectoModel();

            this.enterprise = new EnterpriseModel();

            this.fotoDoc="assets/images/Upload.png";

        }

        ngOnInit() {

            this.loadProyectos();
            this.loadEnterprises();
        }

        //Obligatoriedad de campos

        public validate(proyecto: ProyectoModel): boolean {
        let isValid = true;

        if(!proyecto.nombre){
           isValid = false;
        }
        if(!proyecto.tipo){
           isValid = false;
        }
        if(!proyecto.clienteId){
            isValid = false;
         }

        return isValid;
      }

        //Mostrar el crear o nno

        createHide() {
            this.visible = !this.visible;

            if(this.visible === true){

                this.icon = "fa fa-caret-down";

            }else{

                this.icon= "fa fa-caret-left";

            }
        }

        //Para cargar proyectos

    private loadProyectos(): void {
        this.proyectoService.getProyectos().subscribe(res => {

            this.proyectos = res;

            console.log(this.proyectos);

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

    //Para traer los usuarios de las empresas

    setNew(id: any): void {
        console.log(id);

            //  this.filterEn = this.enterprises.filter(value => value.id === parseInt(id));

            //  console.log(this.filterEn[0]);

            this.proyecto.clienteId = id;

            this.proyectoService.getAllEmployeesToEmpresaId(id).subscribe(res => {

                console.log(res);

                this.employees = res;

            },(error)=>{

                console.log(error);

                this.toastr.error("Error actualizar los datos");

            });

        }

        //Elminar un usuario asociado a la empresa

        deleteUserToEnterprise(model, index){

            this.userToEnterprise.splice(index,1);

            this.employees.push(model);

            console.log(this.userToEnterprise);

        }

        //Al seleccionar un usuario

        setNewUser(id: string): void {
            console.log(id);

            var indexDelete;

             this.filterEn = this.employees.filter(value => value.id === parseInt(id));

             [].forEach.call(this.employees,function(data,index){

                if (data.id.toString() === id){

                   indexDelete = index;

                }

             }

            )

            console.log(indexDelete);

            this.employees.splice(indexDelete,1);

            //  console.log(this.employees);

            //  console.log(this.filterEn[0]);

             this.userToEnterprise.push(this.filterEn[0]);

            //  console.log(this.userToEnterprise);

            }

        //PAra cargar empresas

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

    //Para guardar

    save(){

        if(this.login.authUser !== undefined){
            this.proyecto.usuarioCreacion=this.login.authUser.email;
        }

        console.log(this.proyecto);

        this.isValid = this.validate(this.proyecto);

        if (this.isValid) {

        this.proyectoService.saveOrUpdate(this.proyecto).subscribe(res => {
            // if (res.responseCode == OK) {
                console.log(res);
                this.loadProyectos();

                this.proyecto = new ProyectoModel();

                this.toastr.success('Transacción satisfactoria', 'Gestión de Proyectos');
            // } else {
            //     this.message = res.message;
            //     this.isValid = false;
            //     console.log(this.message);
            // }
        },(error)=>{
            console.log(error);

                this.toastr.error(error.error.message, "Error en la transacción");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });

    } else {
        this.message = "Los campos con * son obligatorios";
    }

    }

    //Editar

    upload(model):void{

        if(this.login.authUser !== undefined){

            model.usuarioCreacion=this.login.authUser.email;
            }

        this.proyecto = model;

        this.visible = true;

        this.icon= "fa fa-caret-down";

        this.proyectoService.getAllEmployeesToEmpresaId(model.empresaId).subscribe(res => {

            console.log(res);

            // this.usuarios = res;

        },(error)=>{

            console.log(error);

            this.toastr.error("Error actualizar los datos");

        });

    }

    //Eliminar
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

            this.proyectoService.delete(model).subscribe(res=>{
                // if (res.responseCode == OK) {
                    this.loadProyectos();

                    this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Proyectos');

                    // swal(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    //   )

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

    //Checkear usuario

    checkUser(model):void{

        console.log(model);
    }

    // Para cargar el archivo

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

    var word = /word-*|excel-*|pdf-*|officedocument-*/;
    var excel = /excel-*/;
    var pdf = /pdf-*/;

    var reader = new FileReader();

    console.log(file.type);

    if (!file.type.match(word)) {
        swal(
            'Error al cargar el documento',
            'Solo s epeuden cargar documentos de excel, word o pdf',
            'error'
          );
        return;
    }

    this.styleIconUpload = "green";

    this.iconUpload = "fa-check-circle";

    this.nameUpload = file.name;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        var reader = e.target;

        console.log(reader.result);
        this.fotoDoc = reader.result;
    }




}
