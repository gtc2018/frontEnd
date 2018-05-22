import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


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
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import { OK } from '../../../messages/httpstatus';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/guard/auth.service';
import swal from 'sweetalert2';
import { FaseModel } from '../../../model/fase';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
//   styleUrls: ['./create-request.component.scss']
  providers: [RequestService, LoginService, EnterpriseService, ProyectosService, FaseService, EstadoService]
})
export class CreateRequestComponent implements OnInit {

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
    private codigoRQM: String;
    private cotizacion: CotizacionModel[];
    private cotizaciones: CotizacionModel[];
    
 

    //Funciones

    constructor(
      private requestService: RequestService, 
      private enterpriseService: EnterpriseService,
      private proyectoService: ProyectosService,
      private estadoService: EstadoService,
      private toastr: ToastrService,
      private login:AuthService,
      private menu: LoginService,
      private faseService: FaseService){

        this.requestForm = new RequerimientoModel();

    if(this.login.authUser !== undefined){

        console.log(this.login.authUser.usuarioId); 

    }

  }

    ngOnInit(){
      this.loadEnterprises();
      this.loadFases();
      this.loadEstados();
    }

    

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


  private loadFases(): void {
    this.faseService.getFases().subscribe(res => {
        this.fases = res;
        console.log(this.enterprises);
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
        console.log("REQUERIMIENTOOOOO");
        console.log(this.cotizacion);
        this.codigoRQM =this.cotizacion[0].codigoRequerimiento;
    }



    save():void{

 
        
      console.log(this.requestForm);


      if(this.login.authUser !== undefined){
          this.requestForm.usuarioCreacion=this.login.authUser.usuarioId;
      }

      this.isValid = this.validate(this.requestForm);
      //this.isValidFechas = this.asignarFechas();

      //this.requestForm.fechaInicio=this.newStructure(this.requestForm.fechaInicio);
      //this.requestForm.fechaEntrega=this.newStructure(this.requestForm.fechaEntrega).toString();
      //this.requestForm.fechaInicio=new Date(this.requestForm.fechaInicio).toString;
     

      //console.log("Fechaaaaaaaaaaaaaaaaaaaaa");
      //console.log(this.requestForm.fechaInicio)
      //console.log(this.requestForm.fechaInicio['year']);
      //console.log(this.requestForm.fechaInicio['month']);
      //console.log(this.requestForm.fechaInicio['day']);
      //this.requestForm.fechaInicio = this.requestForm.fechaInicio['year']+"-"+this.requestForm.fechaInicio['month']+"-"+this.requestForm.fechaInicio['day']+" 00:00:00"
      this.requestForm.fechaInicio = this.formatoFecha(this.requestForm.fechaInicio);
      
      if (this.isValid && this.isValidFechas) {

          this.requestService.saveOrUpdate(this.requestForm).subscribe(res => {
              
          this.requestForm = new RequerimientoModel();
          this.codigoRQM="";
          
          this.toastr.success('Transacción satisfactoria', 'Gestión de Requerimientos');

      },(error)=>{ //Controlando posible error

          console.log(error);

          this.toastr.error(error.error.message,"Error en la transacción");
          
      });

      } else {
            
            if (!this.isValidFechas){
                this.message= this.message + 'por favor revise las fechas';
                
            }else{
                console.log(this.messageEmail);
                if(!this.messageEmail){
                this.message= 'Los campos con * son obligatorios!';
           
                }else{
                    this.message= this.messageEmail;
                    this.messageEmail= undefined;
                }
            //}
      }
  }
}


  public validate(requestForm: RequerimientoModel): boolean {
    let isValid = true;
    if(!requestForm.clienteId){
        isValid = false;
        console.log("cliente");
     }
     if(!requestForm.proyectoId){
        isValid = false;
        console.log("proyecto");
     }
     if(!requestForm.descripcion){
        isValid = false;
        console.log("descripcion");
     }
     if(!requestForm.cotizacionId){
        isValid = false;
        console.log("cotizacion");
     }
     if(!requestForm.version){
        isValid = false;
        console.log("version");
     }
     if(!requestForm.centroCosto){
        isValid = false;
        console.log("centro costo");
     }
     if(!requestForm.faseId){
        isValid = false;
        console.log("fase");
     }
     if(!requestForm.estadoId){
        isValid = false;
        console.log("estado");
     }
    
    return isValid;
  }

  public asignarFechas():boolean{
    let isValidFechas=true;
    
        if((this.requestForm.fechaInicio > this.requestForm.fechaPlaneadaEntrega) || (this.requestForm.fechaInicio > this.requestForm.fechaEntrega)){
            
            isValidFechas =  false;

            this.message= 'recuerde que la fecha de inicio no puede ser mayor a las otras dos fechas';
            
        }
    return isValidFechas
  }

  formatoFecha(fecha): String {
    let fechaString ="";
    fechaString = fecha['year']+"-"+fecha['month']+"-"+fecha['day']+" 00:00:00"
    return fechaString;
}

}
