import { Component, OnInit, Input } from '@angular/core';
import { ButtonViewComponent } from '../quotation.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalQComponent } from '../modal-q/modal-q.component';
import { CreateDetailComponent } from '../modal-q/template/create-detail/create-detail';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../proyectos/proyectos.service';
import { EnterpriseService } from '../../enterprise/enterprise.service';
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss'],
  providers: [ProyectosService, EnterpriseService, QuotationService]
})
export class CreateQuotationComponent implements OnInit {

    //Variables

    systemInit: { id: number; name: string; value: boolean; }[];
    // toolInit: { id: number; name: string; value: boolean; }[];
    toolInit=[];

    modelDateDS;
    modelDateSol;
    modelDateEnt;

    closeResult: string;

    systemItem= [];


    toolItem= [];

    //Funciones

  ngOnInit() {
  }

  constructor(private modalService: NgbModal,
    private quotationService: QuotationService,
    private enterpriseService: EnterpriseService,
    private proyectoService: ProyectosService,
    private route: ActivatedRoute) {

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

}

  system() {
    const modalRef = this.modalService.open(ModalQComponent);
    modalRef.componentInstance.title = 'Sistemas';
    modalRef.componentInstance.seleccionados = 'los sistemas';
    modalRef.componentInstance.template = `system`;

    console.log(this.systemItem);

    let instance = modalRef.componentInstance;

    instance.array =  this.systemInit;

    modalRef.result.then( (result) => {

        this.systemItem=[];

        for (let r of result){

            if (r.value === true){

                this.systemItem.push(r);

            }

        }

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

    instance.array =  this.toolInit;

    modalRef.result.then( (result) => {

        this.toolItem=[];

        for (let r of result){

            if (r.value === true){

                this.toolItem.push(r);

            }

        }

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




}
