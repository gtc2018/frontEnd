import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HerramientaService } from '../../../../herramientas/servicios/herramienta.service';
import { ToolsxQuotationModel } from '../../../../../model/toolsxQuotation';
import { HerramientaModel } from '../../../../../model/herramienta.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tool-component',
  templateUrl: './tool.html',
  providers: [HerramientaService]
})
export class ToolComponent implements OnInit {

  // Variables

  model: {id:number; name:string; value:number};

    @Input() title: string;

    @Input() toolsxQuotation:ToolsxQuotationModel[];

    new:boolean=false;

    toolList=[];
   
    tools=[];

    tool: HerramientaModel;


    ngOnInit() {

      console.log(this.toolsxQuotation);

      this.loadTools();
    }

    constructor(public activeModal: NgbActiveModal,
      public herramientaService : HerramientaService,
      private toastr: ToastrService){

        this.tool = new HerramientaModel();
        // console.log(this.array);
    
        // this.tool=[
        //     {id:1, name:"As400",value:false},
        //     {id:2,name:"Mac", value:true},
        //     {id:3,name:"Windows", value:true}
        // ]
    
      }

    

   //  Funciones

   newTool():void{

       this.new= !this.new;
    };

    saveToolToQuotation():void{

       this.activeModal.close(this.tools);

     }

    save():void{

      this.new= !this.new;

      console.log(this.tool);
  
      this.herramientaService.saveOrUpdate(this.tool).subscribe(res=>{
  
        this.toastr.success("Transacción satisfactoria");
  
        this.loadTools();
  
      },(error)=>{
  
        this.toastr.error("Error al guardar la herramienta"); 
  
      });
    };


    loadTools(){

      this.herramientaService.getHerramientas().subscribe(response=>{
  
        this.tools = response;
  
        console.log(this.tools);
  
        this.generateToolFullArray();
      },(error)=>{
  
        console.log(error);
      });
  
    }
  
    generateToolFullArray():void{
  
      for(let s of this.tools){
  
        var filterEn = this.toolsxQuotation.filter(value => value.herramientaName === s.descripcion);
  
        console.log(filterEn);
  
        if( filterEn.length !== 0 ){
  
        s.value=1;
  
        }else{
  
          s.value=0;
  
        }
  
      }
  
        console.log(this.toolList,"Generando el tool maestro");
  
    }


     

}
