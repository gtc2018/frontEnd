import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PorcentajePorFaseService } from '../../../../../porcentajePorFase/servicios/porcentajePorFase.service';
import { PorcentajePorFaseModel } from '../../../../../../model/porcentajePorFase.model';
import { FasesxDetalleCotizacionModel } from '../../../../../../model/FasesxDetalleCotizacion';
import { FaseModel } from '../../../../../../model/fase';
import { DetailQuotationService } from '../../../../create-quotation/detail-quotation.service';
import swal from 'sweetalert2';

@Component({
  selector: 'modal-fxd-component',
  templateUrl: './modal-fxd.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [PorcentajePorFaseService,DetailQuotationService]
})
export class ModalFxdComponent implements OnInit {

     @Input() enterpriseId;

     @Input() detailId;

     @Input() faseId;

     hoursTotal: number;

     porcentajePorFase= new PorcentajePorFaseModel();

     fasesEnterprise: PorcentajePorFaseModel[];

     fases= [];

     fasesxDetalleCotizacion: FasesxDetalleCotizacionModel[];

     fasexDetalleCotizacion= new FasesxDetalleCotizacionModel();

     editing:boolean = false;

     ngOnInit() {

        this.loadFasesxEmpresa();

        this.loadFasesxDetailQuotation();

        if(this.faseId == undefined){

            this.faseId = "";
        }
        
      }

  constructor(private modalService: NgbModal,
              private porcentajexFaseService: PorcentajePorFaseService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
             private detailQuotationService: DetailQuotationService){

                 this.fasexDetalleCotizacion.fase = new FaseModel();

              }

  loadFasesxEmpresa(){

    this.porcentajePorFase.id = this.enterpriseId;

    this.porcentajexFaseService.getFasesxEmpresa(this.enterpriseId,this.detailId)
  .subscribe(res=>{

    this.fasesEnterprise = res;

    // this.fasesEnterprise.fa

    console.log(this.fasesEnterprise);

    for (let i=0;i<this.fasesEnterprise.length;i++){

        console.log(i);

        this.fases[i] =  this.fasesEnterprise[i].fases;   

    }

    // [].forEach.call(this.fases, function (data, index) {

    //     for(let fxd of this.fasesxDetalleCotizacion){

    //         if (fxd.faseName === this.fases[index].descripcion){

    //              this.fases.splice(index,1);

    //         }      

    //     }
    // }

  },(error)=>{

    console.log(error);

    this.toastr.error("Error al cargar las fases por empresa");

  });

  

//   this.porcentajexFaseService.getFasesPorEmpresa(this.enterpriseId)
//   .subscribe(res=>{

//     console.log(res);

//   },(error)=>{

//     console.log(error);

//   })


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

private save(){

    this.fasexDetalleCotizacion.fase.id = this.faseId;

    this.fasexDetalleCotizacion.detalleCotizacionId=this.detailId;

    this.detailQuotationService.saveOrUpdateFasexDetalleCotizacion(this.fasexDetalleCotizacion)
    .subscribe(res=>{

        this.fases=[];

        this.toastr.success("Registro guardado con éxito");

        this.loadFasesxDetailQuotation();

        this.loadFasesxEmpresa();

        this.clean();

        this.editing=false;

    },(error)=>{

        console.log("Mala");

        this.toastr.error("Error al guardar el registro");

    })

}

private loadFasesxDetailQuotation(){

    this.detailQuotationService.getFasesxDetalleCotizacion(this.detailId).subscribe(res=>{

        this.fasesxDetalleCotizacion = res;

        if(res.length == 0){

            this.toastr.warning("Este detalle no presenta fases asociadas");

        }

        ///Para contar el total de horas del detallexFase

        var total = 0;

        for(let fxd of this.fasesxDetalleCotizacion){

            total = total + fxd.horas
        }

        this.hoursTotal = total


    },(error)=>{

        console.log(error);

        this.toastr.error("Error al cargar las fases asociadas al detalle de la cotización");

    })

}

private clean(){

    this.fasexDetalleCotizacion = new FasesxDetalleCotizacionModel;

    this.fasexDetalleCotizacion.fase = new FaseModel();

    this.editing=false;
}

private edit(model:FasesxDetalleCotizacionModel){

    console.log(model);

    this.fasexDetalleCotizacion = model;

    console.log(model.fase.id);

    this.fases.push(model.fase);

    this.faseId = model.fase.id;

    this.editing=true;
}

private delete(id:number){

    swal({
        title: 'Esta seguro?',
        text: "El registro eliminado no podrá ser recuperado",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    }).then((result) => {

        if (result.value) {
          
            this.detailQuotationService.deleteFasexDetalleCotizacion(id).subscribe(res=>{

                this.toastr.success("Registro eliminado exitosamente");

                this.loadFasesxDetailQuotation();

                this.loadFasesxEmpresa();
        
            },(error)=>{
        
                console.log(error);
        
                this.toastr.error("error al eliminar el registro");
            });
                            
        }
    })

    
}


selectFase(id:number){

    console.log(id);

    this.faseId = id;

}

}