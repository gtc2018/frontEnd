import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-q',
  templateUrl: './modal-q.component.html',
  styleUrls: ['./modal-q.component.scss']
})
export class ModalQComponent implements OnInit {
    @Input() title;
    @Input() seleccionados;
    @Input() template;
    @Input() array;
    @Input() quotationId;    
    @Input() enterpriseId;
    @Input() detailId;
    @Input() cotizacion;



  constructor( public activeModal: NgbActiveModal ) {

  }

  ngOnInit() {

    console.log(this.template);

  }

}
