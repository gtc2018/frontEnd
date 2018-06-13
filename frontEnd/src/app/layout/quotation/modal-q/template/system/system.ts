import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SistemaService } from '../../../servicios/quotation.service';
import { SistemaModel } from '../../../../../model/sistema.model';

@Component({
  selector: 'system-component',
  templateUrl: './system.html',
  providers: [SistemaService]
})
export class SystemComponent implements OnInit {
     @Input() title;

    @Input() system;

    // Variables

 new:boolean=false;

 systemList=[];

 systems:SistemaModel[];

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

    this.loadSystems();
  }

  constructor(public activeModal: NgbActiveModal,
  public sistemaService : SistemaService){



    // console.log(this.array);

    // this.system=[
    //     {id:1, name:"As400",value:false},
    //     {id:2,name:"Mac", value:true},
    //     {id:3,name:"Windows", value:true}
    // ]

  }

  loadSystems(){

    this.sistemaService.getSistemas().subscribe(response=>{

      this.systems = response;

      // this.


    },(error)=>{

      console.log(error);
    });

    

  }

  

}
