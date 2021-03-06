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
    @Input() empleadoId;



  constructor( public activeModal: NgbActiveModal ) {

  }

  ngOnInit() {
      console.log(this.array);
      console.log(this.empleadoId);
  }

}
