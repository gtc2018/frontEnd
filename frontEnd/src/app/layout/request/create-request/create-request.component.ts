import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


import { routerTransition } from '../../../router.animations';
import { ButtonViewComponent } from '../../quotation/quotation.component';
import { RequerimientoModel } from '../../../model/requerimiento.model';
import { EnterpriseModel } from '../../../model/enterprise';
import { ProyectoModel } from '../../../model/proyectos';
import { CotizacionModel } from '../../../model/cotizacion.model';
import { EstadoModel } from '../../../model/estado.model';


import { LoginService } from './../../../login/servicios/login.service';
import { RequestService } from './../request.service';
import { EnterpriseService } from '../../enterprise/enterprise.service';
import { ProyectosService } from '../../proyectos/proyectos.service';
import { FaseService } from '../../fases/servicios/fase.service';
import { EstadoService } from '../../estados/servicios/estado.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import { OK } from '../../../messages/httpstatus';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/guard/auth.service';
import swal from 'sweetalert2';
import { FaseModel } from '../../../model/fase';

import { Location } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
//   styleUrls: ['./create-request.component.scss']
  providers: [RequestService, LoginService, EnterpriseService, ProyectosService, FaseService, EstadoService]
})
export class CreateRequestComponent implements OnInit {

    test: NgbDateStruct;
    messageEmail: string; 
    message: string;

    requestForm: RequerimientoModel;

    //Variables

    modelIDS: any;
    modelPEDS: any;
    modelREDS: any;

    //Propiedades del upload
    styleIconUpload: string = "";
    iconUpload: string = "fa-upload";
    nameUpload: string = "Subir Documento";
    documentTemp: string ="";
    ruta: string ="../"
    codigoRQM: String;
    editarRequest: any;
    totalHallazgo: number;
    emailRegex: RegExp;

    visible: boolean = false;
    dragging: boolean = false;
    disabledEnterprise: boolean = false;
    disabledProyecto: boolean = false;
    disabledCotizacion: boolean = false;

    file: File = null;
    fechaInicio; NgbDateStruct;
    
    filterPr: ProyectoModel[];
    private isValid: boolean = true;
    private isValidFechas: boolean = true;
    private fases: FaseModel[];
    private estados: EstadoModel[];
    private enterprises: EnterpriseModel[];
    private enterprises2: EnterpriseModel[];
    private proyectos: ProyectoModel[];
    private proyectos2: ProyectoModel[];
    private proyecto: ProyectoModel;
    
    private cotizacion: CotizacionModel[];
    private cotizaciones: CotizacionModel[];

    testt: NgbDateParserFormatter;
    
 

    //Funciones

    constructor(
        private requestService: RequestService, 
        private enterpriseService: EnterpriseService,
        private proyectoService: ProyectosService,
        private estadoService: EstadoService,
        private toastr: ToastrService,
        private login:AuthService,
        private menu: LoginService,
        private faseService: FaseService,
        private _location: Location,
        private route: ActivatedRoute){

            console.log(route.snapshot.params.id);
            if(this.login.authUser !== undefined){

                console.log(this.login.authUser.usuarioId); 
            }

            //this.loadEnterprises();
            

            if(route.snapshot.params.id){
                this.editarRequest=route.snapshot.params.id;
                this.requestForm = new RequerimientoModel();
                this.requestForm.cliente = new EnterpriseModel();
                this.requestForm.proyecto = new ProyectoModel();
                this.requestForm.cotizacion = new CotizacionModel();
                this.enterprises = [];
                this.proyectos = [];
                this.cotizaciones = [];
                this.cotizacion = [];
                this.disabledEnterprise = true;
                this.disabledProyecto= true;
                this.disabledCotizacion= true;
                this.fechaInicio ={
                    "year": 2018,
                    "month":  1,
                    "day": 1,
                };
                 

            }else{
                this.requestForm = new RequerimientoModel();
                this.requestForm.cliente = new EnterpriseModel();

                this.requestForm.numeroHallazgoBloqueante=0;
            
                this.requestForm.numeroHallazgoFuncional=0;
            
                this.requestForm.numeroHallazgoPresentacion=0;
        
                this.totalHallazgo = 0;

            }

  }

    ngOnInit(){

        if(this.editarRequest){
            this.cargarRequest();             
        }else{
            this.loadEnterprises();
        }

        this.loadFases();
        this.loadEstados();
    }
    

    

    private loadEnterprises(): void {
      this.enterpriseService.getEnterprises().subscribe(res => {
          this.enterprises = res;
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


  private loadFases(): void {
    this.faseService.getFases().subscribe(res => {
        this.fases = res;
    },(error)=>{
        console.log(error);

        this.toastr.error("Error al cargar los datos de Fases");
        // swal(
        //     'Error',
        //     error.error.message,
        //     'error'
        //   )
    });
}

private loadEstados(): void {
    this.estadoService.getEstados().subscribe(res => {
        this.estados = res;
        console.log(this.enterprises);
    },(error)=>{
        console.log(error);

        this.toastr.error("Error al cargar los datos de Estados");
        // swal(
        //     'Error',
        //     error.error.message,
        //     'error'
        //   )
    });
}


    private getProyectosByCliente(id: any){


        this.enterprises2 = this.enterprises.filter(value => value.id === parseInt(id));
        this.codigoRQM="";

        
        
    
        this.proyectoService.getProyectoByCliente(id).subscribe(res => {
            this.proyectos= res;

            this.requestForm.proyecto = new ProyectoModel();
            this.requestForm.cotizacion = new CotizacionModel();
            this.requestForm.clienteId=id;
            this.requestForm.proyectoId = null;
            this.requestForm.cotizacionId = null;

            if(this.proyectos.length == 0){
                this.toastr.warning('No existen proyectos para este cliente');
            }


            
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos de Proyectos");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });

        
    }
    
    private getCotizacionByProyecto(id: any){

        this.requestForm.cotizacion = new CotizacionModel();
        this.codigoRQM="";

        this.filterPr = this.proyectos.filter(value => value.id === parseInt(id));
        
    
        this.requestService.getCotizacionByProyecto(id).subscribe(res => {
            this.cotizaciones= res;

            this.requestForm.cotizacion = new CotizacionModel();
            this.requestForm.cotizacionId = null;

            if(this.cotizaciones.length == 0){
                this.toastr.warning('No existen Cotizaciones, o no hay Requerimientos por crear en este proyecto');
            }
            
        },(error)=>{
            console.log(error);

            this.toastr.error("Error al cargar los datos de Cotizacion");
            // swal(
            //     'Error',
            //     error.error.message,
            //     'error'
            //   )
        });

        
        
    }

    getRequest(id: any){
        this.codigoRQM="";
        this.cotizacion = id;
        this.cotizacion = this.cotizaciones.filter(value => value.id === parseInt(id));
        this.codigoRQM =this.cotizacion[0].codigoRqm;
    }




    save():void{

        console.log(this.requestForm);

        if(this.login.authUser !== undefined){
            if(this.requestForm.id === null){
                this.requestForm.usuarioCreacion=this.login.authUser.usuarioId;
            }else{
                this.requestForm.usuarioModificacion =this.login.authUser.usuarioId;
            }
        }

        this.isValid = this.validate(this.requestForm);
        this.formatoFechas();
        this.isValidFechas = this.validarFechas();
      
        if (this.isValid && this.isValidFechas) {

            if(this.file !==null && this.file.name !==null){
                this.requestForm.archivo = this.file.name;
            }

            this.requestService.saveOrUpdate(this.requestForm).subscribe(res => {
                this.requestForm = new RequerimientoModel();
                this.codigoRQM="";
                this.requestForm.numeroHallazgoBloqueante=0;    
                this.requestForm.numeroHallazgoFuncional=0;
                this.requestForm.numeroHallazgoPresentacion=0;
                this.totalHallazgo=0;
                this.nameUpload = "Subir Documento";

        
                this.toastr.success('Transacción satisfactoria', 'Gestión de Requerimientos');

                this._location.back();
                

            },(error)=>{ //Controlando posible error
                console.log(error);

                this.toastr.error(error.error.message,"Error en la transacción");
            });

        } else {
                if (!this.isValidFechas){
                    this.message= this.message + ' por favor revise las fechas';
                    
                }else{
                    console.log(this.messageEmail);
                    if(!this.messageEmail){
                    this.message= 'Los campos con * son obligatorios!';
            
                    }else{
                        this.message= this.messageEmail;
                        this.messageEmail= undefined;
                    }
                }
        }
}

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

            this.requestService.delete(model).subscribe(res=>{

                this.toastr.success('Registro eliminado satisfactoriamente', 'Eliminación de Requerimientos');

                this._location.back();
                

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

    public cargarRequest(){
        

        this.requestService.cargarRequerimiento(this.editarRequest).subscribe(res => {
            
            this.requestForm = res;
            this.ruta="../../"
            this.visible = true;
            this.requestForm.clienteId = this.requestForm.cliente.id;
            this.requestForm.proyectoId = this.requestForm.proyecto.id;
            this.requestForm.cotizacionId = this.requestForm.cotizacion.id;
            this.requestForm.faseId = this.requestForm.fase.id;
            this.requestForm.estadoId = this.requestForm.estado.id;
            this.enterprises.push(this.requestForm.cliente);
            this.proyectos.push(this.requestForm.proyecto);
            this.cotizaciones.push(this.requestForm.cotizacion);
            this.getRequest(this.requestForm.cotizacionId);
            this.totalHallazgos();
            this.nameUpload = this.requestForm.archivo.split("REQUERIMIENTOS")[1];
            console.log(this.requestForm);
            

            //this.requestForm.fechaInicio  = JSON.stringify(this.formatoCalendario(this.requestForm.fechaInicio));
            //this.fechaInicio=this.testt.parse(this.requestForm.fechaInicio);
            //this.test = this.fechaInicio;

        },(error)=>{ //Controlando posible error
            console.log(error);

            this.toastr.error(error.error.message,"Error en la transacción");
        });

    }


    
public totalHallazgos(){

    if(!this.requestForm.numeroHallazgoBloqueante){
        this.requestForm.numeroHallazgoBloqueante=0;
    } 
    
    if(!this.requestForm.numeroHallazgoFuncional){
        this.requestForm.numeroHallazgoFuncional=0;
    } 

    if(!this.requestForm.numeroHallazgoPresentacion){
        this.requestForm.numeroHallazgoPresentacion=0;
    } 
    

    this.totalHallazgo = parseInt(this.requestForm.numeroHallazgoBloqueante+"") + parseInt(this.requestForm.numeroHallazgoFuncional+"") + parseInt(this.requestForm.numeroHallazgoPresentacion+"");
}



  public validate(requestForm: RequerimientoModel): boolean {
    
    if(!requestForm.clienteId){
        return false;
     }
     if(!requestForm.proyectoId){
        return false;
     }
     if(!requestForm.descripcion){
        return false;
     }
     if(!requestForm.cotizacionId){
        return false;
     }
     if(!requestForm.version){
        return false;
     }
     if(!requestForm.centroCosto){
        return false;
     }
     if(!requestForm.faseId){
        return false;
     }
     if(!requestForm.estadoId){
        return false;
     }
     
     this.emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(requestForm.emailProyecto){
        if (this.emailRegex.test(requestForm.emailProyecto)) {
            console.log("correcto");
            this.messageEmail = undefined;
        } else {
            
            console.log("incorrecto");
            this.messageEmail = "Por favor digite un formato de email válido para el gestor del proyecto";
            return false;
        }
    }

    if(requestForm.emailTecnico){
        if (this.emailRegex.test(requestForm.emailTecnico)) {
            console.log("correcto");
            this.messageEmail = undefined;
        } else {
                
            console.log("incorrecto");
            this.messageEmail = "Por favor digite un formato de email válido para el gestor técnico";
            return false;
      }
    } 
    
    return true;
  }

  public validarFechas():boolean{
    let isValidFechas=true;
    
        if((this.requestForm.fechaInicio > this.requestForm.fechaPlaneadaEntrega) || (this.requestForm.fechaInicio > this.requestForm.fechaEntrega)){
            
            isValidFechas =  false;

            this.message= 'recuerde que la fecha de inicio no puede ser mayor a las fecha planeacion y real de entrega';
            
        }
       
    return isValidFechas
  }

public formatoFecha(fecha): string {
    console.log(fecha);
    let fechaString ="";
    fechaString = fecha['year']+"-"+fecha['month']+"-"+fecha['day']+" 00:00:00"
    return fechaString;
}

public formatoCalendario(fecha){
    this.fechaInicio={
        "year": 2018,
        "month":  5,
        "day": 2,
    };
    console.log("FORMATOCALENDARIO");
    console.log(this.fechaInicio);
    console.log(JSON.stringify(this.fechaInicio));
}

public formatoFechas(){

    if(this.requestForm.fechaInicio){
        this.requestForm.fechaInicio=this.formatoFecha(this.requestForm.fechaInicio);
     }
     if(this.requestForm.fechaEntrega){
        this.requestForm.fechaEntrega=this.formatoFecha(this.requestForm.fechaEntrega);
     }
     if(this.requestForm.fechaPlaneadaEntrega){
        this.requestForm.fechaPlaneadaEntrega=this.formatoFecha(this.requestForm.fechaPlaneadaEntrega);
     }
}



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
    this.nameUpload=file.name;

var pattern = /word-*|excel-*|pdf-*|officedocument-*/;
var reader = new FileReader();

console.log(reader);

if (!file.type.match(pattern)) {
    swal(
        'Error al cargar logo',
        'Por favor ingrese un formato válido para documentos como word, excel, pdf, officedocument',
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
    //this.requestForm.archivo = reader.result;
    this.documentTemp =  reader.result;
    this.requestForm.documento = this.documentTemp.split(/,(.+)/)[1];
}



}
