import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProyectoModel } from '../../model/proyectos';
import { ProyectosService } from './proyectos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { EnterpriseModel } from '../../model/enterprise';
import { UsuarioService } from '../usuario/servicios/usuario.service';
import { UsuarioModel } from '../../model/usuario/usuario.model';
import swal from 'sweetalert2';
import { AuthService } from '../../shared/guard/auth.service';
import { EmployeeModel } from '../../model/employee';
import { AsociarProyectoService } from './asociarProyecto.service';
import { EmployeeToProject } from '../../model/employeeToProject';

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss'],
    animations: [routerTransition()],
    providers: [ProyectosService, EnterpriseService, UsuarioService, AsociarProyectoService]
})
export class ProyectosComponent implements OnInit {

    //Variables

    fotoEmpresa: string;
    fotoDoc: string;

    private message: string = "";
    icon: string = "fa fa-caret-left";

    //Propiedades del upload
    styleIconUpload: string = "";
    iconUpload: string = "fa-upload";
    nameUpload: string = "Subir Documento";

    // Para mostrar el maestro detalle de proyecto
    updateForm: boolean = false;
    //Mostrar el crear o no
    visible: boolean = false;

    private isValid: boolean = true;

    filterEn: any[];

    /**
     * Manejo del formulario en la misma pantalla de la tabla
     * 1:Formulario contraido
     * 2:Expandido para crear
     * 3:Expandido para editar
     */
    stateExpand: number = 1;


    private proyectos: ProyectoModel[];//Tabla
    private proyecto: ProyectoModel;//Form

    private enterprise: EnterpriseModel;
    private enterprises: EnterpriseModel[];

    private employees: EmployeeModel[];

    private employeeToProject: EmployeeToProject;
    private employeesToProject = [];

    private employeesToEnterpriseEnable = [];


    //Métodos y funciones

    constructor(private enterpriseService: EnterpriseService,
        private proyectoService: ProyectosService,
        private asociarProyectoService: AsociarProyectoService,
        private usuarioService: UsuarioService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService) {

        this.proyecto = new ProyectoModel();

        this.enterprise = new EnterpriseModel();

        this.fotoDoc = "assets/images/Upload.png";

        this.employeeToProject = new EmployeeToProject();

    }

    ngOnInit() {
        this.loadProyectos();
        this.loadEnterprises();
    }

    //Método para gestionar el formato de la fecha

    formatDate(date:Date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        // var ampm = hours >= 12 ? 'pm' : 'am';
        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        // var strTime = hours + ':' + minutes + ' ' + ampm;
        var strTime = hours + ':' + minutes
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "  " + strTime;
      }

    //Obligatoriedad de campos

    public validate(proyecto: ProyectoModel): boolean {
        let isValid = true;

        if (!proyecto.nombre) {
            isValid = false;
        }
        if (!proyecto.tipo) {
            isValid = false;
        }
        if (!proyecto.clienteId) {
            isValid = false;
        }

        return isValid;
    }

    //Mostrar el crear o nno

    createHide() {
        if (this.stateExpand === 3) {

            this.proyecto = new ProyectoModel();

            this.fotoEmpresa = undefined;

            this.stateExpand = 2;

            this.employeesToProject = [];

            this.updateForm = false;

            // this.deleteFormHide = false;

        } else if (this.stateExpand === 1) {

            this.visible = !this.visible;

            if (this.visible === true) {

                this.icon = "fa fa-caret-down";

            } else {

                this.icon = "fa fa-caret-left";

            }

            this.stateExpand = 2

            this.employeesToProject = [];

            this.updateForm = false;

            // this.stateExpand = true;
        } else
            if (this.stateExpand === 2) {

                this.visible = !this.visible;

                if (this.visible === true) {

                    this.icon = "fa fa-caret-down";

                } else {

                    this.icon = "fa fa-caret-left";

                }
                this.stateExpand = 1

                this.updateForm = false;

                this.employeesToProject = [];
            }
    }

    //Para cargar proyectos

    private loadProyectos(): void {
        this.proyectoService.getProyectos().subscribe(res => {

            this.proyectos = res;

            console.log(this.proyectos);

        }, (error) => {
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

        var filterEn = this.enterprises.filter(value => value.id === parseInt(id));

        this.fotoEmpresa = filterEn[0].imagenEmpresa;


        this.proyecto.clienteId = id;


        this.proyectoService.getAllEmployeesToEmpresaId(id).subscribe(res => {

            console.log(res);

            this.employees = res;

            console.log(this.proyecto.id);

            if (this.proyecto.id !== undefined) {

                console.log("filtro propio del proyecto");
                this.asociarProyectoService.getAllForProject(this.proyecto.id.toString()).subscribe((response) => {

                    this.employeesToProject = response;

                    console.log(this.employeesToProject);

                    this.employees.length;

                    for (let i = 0; i < this.employees.length; i++) {

                        if (this.employees[i] !== undefined) {

                            for (let emTp of this.employeesToProject) {

                                if (this.employees[i].id.toString() === emTp.empleadoId.toString()) {

                                    console.log(this.employees[i].toString(), "a eliminar");

                                    this.employees.splice(i, 1);

                                    this.forMasterReturn();

                                    return

                                }

                            }

                        }

                    }


                }, (error) => {
                    console.log(error);
                });



            } else {

                this.employeesToEnterpriseEnable = this.employees
            }

        }, (error) => {

            console.log(error);

            this.toastr.error("Error actualizar los datos");

        });

    }

//For each necesario para que funcione el filtrod e empleados a seleccionar
    forMasterReturn() {

        for (let i = 0; i < this.employees.length; i++) {

            if (this.employees[i] !== undefined) {

                console.log(this.employees[i].id, i, "foreach employees");

                for (let emTp of this.employeesToProject) {

                    console.log(emTp.empleadoId, "foreach employees to proyect");

                    if (this.employees[i].id.toString() === emTp.empleadoId.toString()) {

                        console.log(this.employees[i].id.toString(), "Los demás");

                        this.employees.splice(i, 1);

                        this.forMasterReturn();

                        return


                    }

                }

            }

        }
    }






    //Eliminar un usuario asociado a la empresa

    deleteEmployeeToEnterprise(model, index) {

        this.employeesToProject.splice(index, 1);

        this.employees.push(model);

        console.log(this.employeesToProject);

    }

    //Al seleccionar un usuario

    setNewUser(id: string): void {
        console.log(id);

        var indexDelete;

        var modelToPush;

        var filter = this.employees.filter(value => value.id === parseInt(id));

        [].forEach.call(this.employees, function (data, index) {

            if (data.id.toString() === id) {

                indexDelete = index;

            }

        }

        )

        this.employeeToProject.nombreEmpleado = filter[0].nombres;

        this.employeeToProject.apellidoEmpleado = filter[0].apellidos;

        this.employeeToProject.fotoEmpleado = filter[0].foto;

        this.employeeToProject.empleadoId = filter[0].id.toString();

        this.employeeToProject.proyectoId = this.proyecto.id.toString();

        this.employees.splice(indexDelete, 1);

        this.employeesToProject.push(this.employeeToProject);

        this.employeeToProject = new EmployeeToProject();
    }

    //Para cargar empresas

    private loadEnterprises(): void {
        this.enterpriseService.getEnterprises().subscribe(res => {
            this.enterprises = res;
            console.log(this.enterprises);
        }, (error) => {
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

    

    save() {

        console.log(this.proyecto);

        console.log(this.employeesToProject);
        
        //Si involucró a empleados en la transacción
          if (this.stateExpand === 3){

            for(let emPr of this.employeesToProject){

                if(emPr.id === undefined){

                    emPr.usuarioCreacion = localStorage.email;
                    emPr.fechaCreacion = this.formatDate(new Date());

                }else{

                    emPr.usuarioModificacion = localStorage.email;
                    emPr.fechaModificacion = this.formatDate(new Date());

                }
            }

            console.log(this.employeesToProject);

        this.asociarProyectoService.saveOrUpdateEmployeesToProject(this.proyecto.id, this.employeesToProject).subscribe(res => {
            // if (res.responseCode == OK) {
            console.log(res);
            // this.loadProyectos();

            // this.proyecto = new ProyectoModel();

            this.toastr.success('Transacción satisfactoria', 'Gestión de Proyectos');

            this.updateForm = false;

        }, (error) => {
            console.log(error);

            this.toastr.error(error.error.message, "Error al guardar los empleados asociados al proyecto");

        });
    }

            if(localStorage.email ===undefined){
                this.proyecto.usuarioCreacion=localStorage.email;
            }

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

    //Editar (Pasa la información de la tabla al formulario)

    edit(model): void {

        console.log(model);

        // var filterEn = this.enterprises.filter(value => value.id === parseInt(model.cliente.id));

        // console.log(filterEn);

        // var imagen = filterEn[0].imagenEmpresa;
        
        var imagen = model.cliente.imagenEmpresa;

        console.log(model);

        console.log(this.stateExpand);

        if (this.stateExpand === 1) {
            this.visible = !this.visible;

            if (this.visible === true) {
                this.icon = "fa fa-caret-down";

                // this.deleteFormHide = false;
            } else {
                this.icon = "fa fa-caret-left";
            }
            // this.deleteFormHide = true;

            this.proyecto = model;
            this.stateExpand = 3;
            this.updateForm = true;
            this.setNew(model.cliente.id);

        } else if (this.stateExpand === 2 || this.stateExpand === 3) {
            this.proyecto = model;
            this.stateExpand = 3;
            this.updateForm = true;
            this.fotoEmpresa = imagen;
            this.setNew(model.cliente.id);
            // this.deleteFormHide = true;
        }

    }

    //Eliminar
    delete(model) {

        if (localStorage.email !== undefined) {

            model.usuarioCreacion = localStorage.email;
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

            this.proyectoService.delete(model).subscribe(res => {
                // if (res.responseCode == OK) {
                this.loadProyectos();

                this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Proyectos');

                // swal(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                //   )

            }, (error) => {
                console.log(error);
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

    checkUser(model): void {

        console.log(model);
    }

    loadEmployeesToProject(id) {

        this.asociarProyectoService.getAllForProject(id).subscribe((response) => {

            this.employeesToProject = response;

            console.log(this.employeesToProject);

        }, (error) => {
            console.log(error);
        });
    }


    handleInputChange(e) {

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
                'Solo se pueden cargar documentos de excel, word o pdf',
                'error'
            );
            return;
        }

        this.styleIconUpload = "green";

        this.iconUpload = "fa-check-circle";

        this.nameUpload = file.name;

        // reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }


    //   _handleReaderLoaded(e) {
    //         var reader = e.target;

    //        console.log(reader.result);
    //         this.fotoDoc = reader.result;
    //      }




}
