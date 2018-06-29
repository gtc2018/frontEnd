import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PorcentajePorFaseService } from '../../../../porcentajePorFase/servicios/porcentajePorFase.service';
import { ToastrService } from 'ngx-toastr';
import { ModalFxdComponent } from './modal-fxd/modal-fxd.component';
import { DetalleCotizacionModel } from '../../../../../model/detalleCotizacion';
import { DetailQuotationService } from '../../../create-quotation/detail-quotation.service';
import { PorcentajePorFaseModel } from '../../../../../model/porcentajePorFase.model';

@Component({
  selector: 'create-detail-component',
  templateUrl: './create-detail.html',
  providers: [DetailQuotationService,PorcentajePorFaseService]
})
export class CreateDetailComponent implements OnInit {
  
  //Variables

   @Input() enterpriseId:number;

   @Input() quotationId:number;

   @Input() detailId:number;

   detail= new DetalleCotizacionModel();

   updating: boolean = false;

   porcentajePorFase= new PorcentajePorFaseModel();
   
   ngOnInit() {

    this.detail.cotizacionId = this.quotationId;

    console.log(this.enterpriseId);

    if(this.enterpriseId){

      this.uploadEvents();

    }else{

      console.log("Creando un detalle");

    }
  }

  constructor(private modalService: NgbModal,
              private toastr: ToastrService,
              private detailQuotationService : DetailQuotationService,
              public activeModal: NgbActiveModal,
              private porcentajePorFaseService: PorcentajePorFaseService ){

               
                
              }

  fasesxDetalleModal(){

    const modalRef = this.modalService.open(ModalFxdComponent,{size:"lg",centered: true, backdropClass: 'light-blue-backdrop' },);

    let instance = modalRef.componentInstance;

    modalRef.componentInstance.enterpriseId = this.enterpriseId;
    modalRef.componentInstance.detailId = this.detailId;
    // modalRef.componentInstance.template = `system`;

    // instance.array ;

    modalRef.result.then( (result) => {

               

      }, (reason) => {

        var closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("dissmissed",closeResult);

      });
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

save(){

  this.detailQuotationService.saveOrUpdateDetailQuotation(this.detail).subscribe(res=>{

    console.log("éxito");

    this.toastr.success("Registro guardado con éxito");

    this.activeModal.close();

  },(error)=>{

    console.log("error", error);

    this.toastr.error("Error al guardar el registro");

  })

  console.log(this.detail,"guardando...");
}

uploadEvents(){

  console.log("Editando");

  this.updating=true; 
  
  

  console.log(this.detailId);

  this.detailQuotationService.getDetailQuotation(this.detailId)
  .subscribe(res=>{

    this.detail = res;

  },(error)=>{

    console.log(error);

  })

  

}

}
