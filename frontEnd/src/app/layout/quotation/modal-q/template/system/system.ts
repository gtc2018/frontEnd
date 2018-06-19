import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SistemaModel } from '../../../../../model/sistema.model';
import { SystemsxQuotationModel } from '../../../../../model/systemsxQuotation';
import { SistemaService } from '../../../../sistemas/servicios/sistema.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'system-component',
  templateUrl: './system.html',
  providers: [SistemaService]
})
export class SystemComponent implements OnInit {
  model: {id:number; name:string; value:number};
     @Input() title: string;

    @Input() systemsxQuotation: SystemsxQuotationModel[];

    // Variables

 new:boolean=false;

 systemList=[];

 systems=[];

 system : SistemaModel;


 ngOnInit() {

  console.log(this.systemsxQuotation);

  this.loadSystems();
}

constructor(public activeModal: NgbActiveModal,
public sistemaService : SistemaService,
private toastr: ToastrService){

  this.system = new SistemaModel();
  // console.log(this.array);

  // this.system=[
  //     {id:1, name:"As400",value:false},
  //     {id:2,name:"Mac", value:true},
  //     {id:3,name:"Windows", value:true}
  // ]

}

//  Funciones

newSystem():void{

    this.new= !this.new;
 };

 saveSystem():void{

    this.new= !this.new;

    console.log(this.system);

    this.sistemaService.saveOrUpdate(this.system).subscribe(res=>{

      this.toastr.success("Transacción satisfactoria");

      this.loadSystems();

    },(error)=>{

      this.toastr.error("Error al guardar el sistema"); 

    })

 };

 saveSystemToQuotation():void{

  console.log(this.systems);

   this.activeModal.close(this.systems);

 }

  loadSystems(){

    this.sistemaService.getSistemas().subscribe(response=>{

      this.systems = response;

      console.log(this.systems);

      this.generateSystemFullArray();

      // this.


    },(error)=>{

      console.log(error);
    });

  }

  generateSystemFullArray():void{

    for(let s of this.systems){

      var filterEn = this.systemsxQuotation.filter(value => value.sistemaName === s.descripcion);

      console.log(filterEn);

      if( filterEn.length !== 0 ){

      s.value=1;

      }else{

        s.value=0;

      }

    }

      console.log(this.systemList,"Generando el system maestro");

  }

  

}
