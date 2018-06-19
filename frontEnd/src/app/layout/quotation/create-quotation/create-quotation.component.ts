import { Component, OnInit, Input } from '@angular/core';
import { ButtonViewComponent } from '../quotation.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalQComponent } from '../modal-q/modal-q.component';
import { CreateDetailComponent } from '../modal-q/template/create-detail/create-detail';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ProyectosService } from '../../proyectos/proyectos.service';
import { EnterpriseService } from '../../enterprise/enterprise.service';
import { QuotationService } from '../quotation.service';
import { EnterpriseModel } from '../../../model/enterprise';
import { ToastrService } from 'ngx-toastr';
import { ProyectoModel } from '../../../model/proyectos';
import { CotizacionModel } from '../../../model/cotizacion.model';
import { SystemsxQuotationModel } from '../../../model/systemsxQuotation';
import { ToolsxQuotationModel } from '../../../model/toolsxQuotation';


const now = new Date();

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss'],
  providers: [ProyectosService, EnterpriseService, QuotationService]
})
export class CreateQuotationComponent implements OnInit {

    //Variables

    toolsxQuotation: ToolsxQuotationModel[];
    toolxQuotation: ToolsxQuotationModel;

    systemsxQuotation: SystemsxQuotationModel[];
    systemxQuotation: SystemsxQuotationModel;

    systemInit: { id: number; name: string; value: boolean; }[];
    toolInit=[];
    systemItem= [];
    toolItem= [];

    modelDateSol: NgbDateStruct;
    modelDateEnt: NgbDateStruct;
    modelDateEntRqm: NgbDateStruct;

    
    minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()+1};
    minDateEntrega: NgbDateStruct;
    minDateEntregaRqm: NgbDateStruct;
    

    quotation = new CotizacionModel();

    enterprises: EnterpriseModel[];
    proyectos: ProyectoModel[];

    closeResult: string;

    updating:boolean=false;

    //Funciones

  ngOnInit() {

    console.log(this.minDate);

    if (this.route.snapshot.params.id){

      var quotationId = this.route.snapshot.params.id;
        
      this.uploadEvents(quotationId);


    }else{

        console.log("Estoy Creando");
    }

    this.loadEnterprises();
  }

  constructor(private modalService: NgbModal,
    private quotationService: QuotationService,
    private enterpriseService: EnterpriseService,
    private proyectoService: ProyectosService,
    private route: ActivatedRoute,
    private _route: Router,
    private toastr: ToastrService) {

        console.log(route.snapshot.params.id);

    this.toolInit= [
        {id:1,name:"Angular",value:1},
        {id:2, name:"ReactJs", value:"1"}
    ]

    this.systemInit=[
        {id:1, name:"As400",value:false},
        {id:2,name:"Mac", value:true},
        {id:3,name:"Windows", value:true}
    ]

    //Para agregarlos al xchips

    for (let r of this.systemInit){

        if (r.value === true){

            this.systemItem.push(r);

        }

    }

    for (let r of this.toolInit){

        if (r.value === true){

            this.toolItem.push(r);

        }

    }

    this.quotation = new CotizacionModel();

    if(this.quotation.clienteId == undefined){

        this.quotation.clienteId = "";
    }

    if(this.quotation.proyectoId == undefined){

        this.quotation.proyectoId = "";
    }

    // console.log(this.quotation.alcance);


    this.quotation.proyecto = new ProyectoModel();

    this.quotation.cliente = new EnterpriseModel();

    
    this.systemxQuotation = new SystemsxQuotationModel();

}

//Utils
public formatoFecha(fecha): string {
    console.log(fecha);
    let fechaString ="";
    fechaString = fecha['year']+"-"+fecha['month']+"-"+fecha['day']+" 00:00:00"
    return fechaString;
}

//Utils: Para cargar la fecha en el front
public ConvertStringToNgbDateStruct(date:string): NgbDateStruct {
    
    var fechaToDate = new Date(date);

    var ObjectDate= {year:fechaToDate.getFullYear(), month:fechaToDate.getMonth()+1, day:fechaToDate.getDate()};

    return  ObjectDate;
}

calculateValueTotal():void{

    this.quotation.valorTotal = this.quotation.valueHour * 148;
}

  system() {
    const modalRef = this.modalService.open(ModalQComponent);
    modalRef.componentInstance.title = 'Sistemas';
    modalRef.componentInstance.seleccionados = 'los sistemas';
    modalRef.componentInstance.template = `system`;

    console.log(this.systemItem);

    let instance = modalRef.componentInstance;

    instance.array =  this.systemsxQuotation;

    modalRef.result.then( (result) => {

        console.log(result);

        this.systemItem=[];

        for (let r of result){

            if (r.value === 1 || r.value===true){

                this.systemxQuotation = new SystemsxQuotationModel();

                console.log(this.systemxQuotation);

                this.systemxQuotation.cotizacionId = this.quotation.id;

                this.systemxQuotation.sistema = r;

                this.systemxQuotation.sistemaName = r.descripcion;

                this.systemItem.push(this.systemxQuotation);

            }

        }

        console.log(this.systemItem , "Sistema por cotización resultante");

        this.systemsxQuotation = this.systemItem;

        this.saveSystemsxQuotation();

      }, (reason) => {

        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("dissmissed");

      });

  }

  tools() {
    const modalRef = this.modalService.open(ModalQComponent);
    modalRef.componentInstance.title = 'Herramientas';
    modalRef.componentInstance.seleccionados = 'las herramientas';
    modalRef.componentInstance.template = `tool`;

    let instance = modalRef.componentInstance;

    instance.array =  this.toolsxQuotation;

    modalRef.result.then( (result) => {

        console.log(result);

        this.toolItem=[];

        for (let r of result){

            if (r.value === 1 || r.value===true){

                this.toolxQuotation = new ToolsxQuotationModel();

                console.log(this.toolxQuotation);

                this.toolxQuotation.cotizacionId = this.quotation.id;

                this.toolxQuotation.herramienta = r;

                this.toolxQuotation.herramientaName = r.descripcion;

                this.toolItem.push(this.toolxQuotation);

            }

        }

        console.log(this.toolItem , "herramientas por cotización resultante");

        this.toolsxQuotation = this.toolItem;

        this.saveToolsxQuotation();

        }, (reason) => {

  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  console.log("dissmissed");


         });

  }

  detail() {
    const modalRef = this.modalService.open(ModalQComponent,{size:"lg"});
    modalRef.componentInstance.title = 'Crear Detalle';
    // modalRef.componentInstance.seleccionados = 'las herramientas';
    modalRef.componentInstance.template = `create-detail`;
  }

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}

private loadEnterprises():void{

    this.enterpriseService.getEnterprises().subscribe(res=>{

        this.enterprises= res;

        console.log(this.enterprises);

    },(error)=>{

        console.log(error);

        this.toastr.error(error.message,"Error al cargar las Empresas");

    })
    
}

private getProyectosByCliente(id: any){    

    this.quotation.clienteId=id;    

    this.proyectoService.getProyectoByCliente(id).subscribe(res => {
        this.proyectos= res;

        console.log(this.proyectos);

        this.quotation.proyecto = new ProyectoModel();
        this.quotation.proyectoId = "";

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

private save(){

    this.quotationService.saveOrUpdate(this.quotation).subscribe(res=>{

        if(!this.updating){

        console.log(res);

        this.toastr.success("Registro creado exitósamente con el consecutivo "+ res.consecutivo);

        }else{

            console.log(res);

            this.toastr.success("Registro actualizado con éxito");

        }

        this._route.navigate(['/cotizaciones'])

    },(error)=>{

        console.log(error);

        this.toastr.error("Error al crear la cotización", error.error);

    });

}

private AjustDateA(){

    console.log(this.quotation.fechaEntrega);

   this.quotation.fechaSolicitud = this.formatoFecha(this.modelDateSol);

   console.log(this.quotation.fechaSolicitud);

   this.quotation.fechaEntrega = null ;

   this.modelDateEnt = null;

   this.minDateEntrega = {year: this.modelDateSol['year'], month: this.modelDateSol['month'], day: this.modelDateSol['day'] + 1}
    
}

private AjustDateB() {

    this.quotation.fechaEntrega = this.formatoFecha(this.modelDateEnt);

   console.log(this.quotation.fechaEntrega);

   this.quotation.fechaEntregaRqm = null;

   this.modelDateEntRqm = null;

   this.minDateEntregaRqm = {year: this.modelDateEnt['year'], month: this.modelDateEnt['month'], day: this.modelDateEnt['day'] + 1}

}

private AjustDateC(){

    this.quotation.fechaEntregaRqm = this.formatoFecha(this.modelDateEntRqm);

   console.log(this.quotation.fechaEntregaRqm);

}


private uploadEvents(id: number){
    console.log("Editando");

    this.updating=true;

    this.quotationService.getQuotation(id).subscribe(response=>{

        this.quotation = response;

        this.quotation.clienteId = this.quotation.cliente.id.toString();

        this.proyectoService.getProyectoByCliente(this.quotation.clienteId).subscribe(res => {
            this.proyectos= res;
    
            console.log(this.proyectos);

            this.quotation.proyectoId = this.quotation.proyecto.id.toString();
    
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

        

        console.log(response);

        if(this.quotation.fechaSolicitud !== null){

            this.modelDateSol = this.ConvertStringToNgbDateStruct(this.quotation.fechaSolicitud);

        }

        if(this.quotation.fechaEntrega !== null){

        this.modelDateEnt = this.ConvertStringToNgbDateStruct(this.quotation.fechaEntrega);

   this.minDateEntrega = {year: this.modelDateSol['year'], month: this.modelDateSol['month'], day: this.modelDateSol['day'] + 1}

        }

        if(this.quotation.fechaEntregaRqm !== null){

            this.modelDateEntRqm = this.ConvertStringToNgbDateStruct(this.quotation.fechaEntregaRqm);
            

        this.minDateEntregaRqm = {year: this.modelDateEnt['year'], month: this.modelDateEnt['month'], day: this.modelDateEnt['day'] + 1}
    
        }

        this.loadSystemsxQuotation();

        this.loadToolsxQuotation();

    },(error)=>{

        this.toastr.error("Error al cargar el registro");   
        
        this._route.navigate(['/cotizaciones'])

    });
}

private cancel(){

     this._route.navigate(['/cotizaciones'])

}
//Para traer todos los sistemas asociados a la cotización
private loadSystemsxQuotation(){

    console.log(this.quotation);

   this.quotationService.getSystemsxQuotation(this.quotation.id).subscribe(response=>{

    this.systemsxQuotation = response;

    console.log(this.systemsxQuotation);

   },(error)=>{

    console.log(error);

   });

}

//Para traer todas las herramientas asociadas a la cotizacion
private loadToolsxQuotation(){

    console.log(this.quotation);

   this.quotationService.getToolsxQuotation(this.quotation.id).subscribe(response=>{

    this.toolsxQuotation = response;

    console.log(this.toolsxQuotation);
 

   },(error)=>{

    console.log(error);

   });

}

saveSystemsxQuotation(){

    this.quotationService.saveSystemxQuotation(this.quotation.id, this.systemsxQuotation).subscribe(res=>{

        this.toastr.success("Transacción satisfactoria");

    },(error)=>{

        this.toastr.error("Error al asociar los sistemas a la cotización");

    })
}

saveToolsxQuotation(){

    this.quotationService.saveToolsxQuotation(this.quotation.id, this.toolsxQuotation).subscribe(res=>{

        this.toastr.success("Transacción satisfactoria");

    },(error)=>{

        console.log(error);

        this.toastr.error("Error al asociar las herramientas a la cotización");

    })
}


}
