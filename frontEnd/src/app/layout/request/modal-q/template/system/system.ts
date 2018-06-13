import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'system-component',
  templateUrl: './system.html'
})
export class SystemComponent implements OnInit {
     @Input() title;

    @Input() system;

    // Variables

 new:boolean=false;

 systemForm={};

//  Funciones

newSystem():void{

    this.new= !this.new;
 };

 saveSystem():void{

    this.new= !this.new;

 };

 saveSystemToQuotation():void{

   this.activeModal.close(this.system);

 }


  ngOnInit() {

    console.log(this.system);
  }

  constructor(public activeModal: NgbActiveModal){

    // console.log(this.array);

    // this.system=[
    //     {id:1, name:"As400",value:false},
    //     {id:2,name:"Mac", value:true},
    //     {id:3,name:"Windows", value:true}
    // ]

  }

}
