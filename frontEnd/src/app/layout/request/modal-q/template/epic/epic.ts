import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EpicsxRequestModel } from '../../../../../model/epicsxRequest';
import { EpicaModel } from '../../../../../model/epica.model';
import { EpicService } from './epic.service';
import { LoginService } from './../../../../../login/servicios/login.service';

@Component({
  selector: 'epic-component',
  templateUrl: './epic.html',
  providers: [EpicService, LoginService]
})
export class EpicComponent implements OnInit {
    
    model: {id:number; name:string; value:number};

    @Input() title;

    @Input() proyectoId;

    @Input() epicsxRequest:EpicsxRequestModel[];

    // Variables

    new:boolean=false;

    epicList = [];

    epics=[];

    epica: EpicaModel;

   //  Funciones

    ngOnInit() {

      this.loadEpics();

    }

    constructor(public activeModal: NgbActiveModal,
      public epicService : EpicService,
      private toastr: ToastrService){

        this.epica = new EpicaModel();

    }

    loadEpics(){

      this.epicService.getEpicas(this.proyectoId).subscribe(response=>{

        this.epics = response;

        console.log(this.epics);

        this.generateEpicFullArray();
      },(error)=>{

        console.log(error);
      });

    }


    generateEpicFullArray():void{
    
      for(let s of this.epics){

      var filterEn = this.epicsxRequest.filter(value => value.epica.id === s.id);

        console.log(filterEn);

        if( filterEn.length !== 0 ){

        s.value=1;

        }else{

          s.value=0;

        }
        

      }

      console.log(this.epics,"Generando el tool maestro");

    }

   newEpic():void{

       this.new= !this.new;
    };

    saveEpicToRequest():void{

       this.activeModal.close(this.epics);

     }

    save():void{

      this.new= !this.new;

      this.epica.proyectoId = this.proyectoId;

      this.epica.estadoe = 1;

      console.log(this.epica);
  
      this.epicService.saveOrUpdate(this.epica).subscribe(res=>{
  
        this.toastr.success("Transacción satisfactoria");
  
        this.loadEpics();
  
      },(error)=>{
  
        this.toastr.error("Error al guardar epica"); 
  
      });
    };


     

}
