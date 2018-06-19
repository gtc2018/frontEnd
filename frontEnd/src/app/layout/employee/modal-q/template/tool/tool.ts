import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tool-component',
  templateUrl: './tool.html'
})
export class ToolComponent implements OnInit {
    @Input() title;

    @Input() tool;

    // Variables

    new:boolean=false;

   //  Funciones

   newTool():void{

       this.new= !this.new;
    };

    saveToolToQuotation():void{

       this.activeModal.close(this.tool);

     }

    save():void{

       this.new= !this.new;
    };


     ngOnInit() {
     }

     constructor(public activeModal: NgbActiveModal){

    //    this.tool= [
    //        {id:1,name:"Angular",value:false},
    //        {id:2, name:"ReactJs", value:true}
    //    ]

     }

}
