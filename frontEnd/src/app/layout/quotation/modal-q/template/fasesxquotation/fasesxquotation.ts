import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SistemaModel } from '../../../../../model/sistema.model';
import { SystemsxQuotationModel } from '../../../../../model/systemsxQuotation';
import { SistemaService } from '../../../../sistemas/servicios/sistema.service';
import { ToastrService } from 'ngx-toastr';
import { FasesxDetalleCotizacionModel } from '../../../../../model/FasesxDetalleCotizacion';
import { DetailQuotationService } from '../../../create-quotation/detail-quotation.service';

@Component({
  selector: 'fasesxquotation-component',
  templateUrl: './fasesxquotation.html',
  providers: [DetailQuotationService]
})
export class FasesxQuotationComponent implements OnInit {

    @Input() quotationId: number;

    @Input() title: string;

    // Variables

 fasesxCotizacion: FasesxDetalleCotizacionModel[];

 //Funciones principales de la clase

 ngOnInit() {

    this.loadFasesxQuotation();

}

constructor(public activeModal: NgbActiveModal,
public detailQuotationService : DetailQuotationService,
private toastr: ToastrService){

}

//  Funciones complementarias

loadFasesxQuotation(){

    this.detailQuotationService.getFasesxCotizacion(this.quotationId).subscribe(res=>{

      this.fasesxCotizacion = res;

      console.log(res);

      if(this.fasesxCotizacion.length === 0 ){

        this.toastr.warning("No se ha asociado ninguna fase a esta cotización");     

      } 

    },(error)=>{

        this.toastr.error("Error al cargar las fases de la cotización");

    })

}  

}