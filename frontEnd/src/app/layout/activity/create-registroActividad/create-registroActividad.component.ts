import { Component, OnInit, ChangeDetectionStrategy, Input, } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityForm } from '../activityForm';
import * as moment from 'moment';

import { CalendarEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, subMinutes } from 'date-fns';
import { colors } from '../activity-utils/colors';
import { forEach } from '@angular/router/src/utils/collection';
import { routerTransition } from '../../../router.animations';

import { Ng2SmartTableModule, ViewCell } from 'ng2-smart-table';
import { filter } from 'rxjs/operators/filter';
import { Router } from '@angular/router';
import { EnterpriseService } from '../../enterprise/enterprise.service';
import { RegistroActividadModel } from '../../../model/registroActividad.model';
import { EnterpriseModel } from '../../../model/enterprise';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/guard/auth.service';
import { ProyectosService } from '../../proyectos/proyectos.service';
import { ProyectoModel } from '../../../model/proyectos';
import { RequerimientoModel } from '../../../model/requerimiento.model';
import { RequestService } from '../../request/request.service';
import { FaseService } from '../../fases/servicios/fase.service';
import { TareaService } from '../../tareas/servicios/tarea.service';
import { FaseModel } from '../../../model/fase';
import { TareaModel } from '../../../model/tarea.model';
import { AreaService } from '../../areas/servicios/area.service';
import { AreaModel } from '../../../model/area.model';
import { RegistroActividadService } from '../servicios/registroActividad.service';

@Component({
  selector: 'app-create-registroActividad',
  templateUrl: './create-registroActividad.component.html',
  styleUrls: ['./create-registroActividad.component.scss'],
  providers: [ EnterpriseService, ProyectosService, RequestService, FaseService, TareaService, AreaService,
    RegistroActividadService]
})
export class CreateRegistroActividadComponent implements OnInit {

    //Variables ---------------------------------------------------

    
    private registroActividad: RegistroActividadModel[];
    private enterprises: EnterpriseModel[];
    private fases: FaseModel[];
    private tareas: TareaModel[];
    private projects: ProyectoModel[];
    private requests: RequerimientoModel[];
    private registroActividadForm: RegistroActividadModel;
    private area: AreaModel;
    submitText:string = "Guardar";
    mes:string;
    dia:string;
    año:string;
    fechaTrabajo:string;
    
    
    identificador: Number = 0;

    activeDayIsOpen: boolean = true;

    view: string = 'month';

  viewDate: Date = new Date();

  activity;

  activityUpd = {};

  activityForm= new ActivityForm();

  respective = [];

  disHFinal: boolean = true;

  limitHour: string;

  horaCero = moment('00:00','HH: mm');

  rQ = [];

  cL = [];

  pR = [];

  fA = [];

  tA = [];

  curRq: any = this.rQ[0];

  curCl: any = this.cL[0];

  curPr: any= this.pR[0];

  curFa: any = this.fA[0];

  curTa: any = this.tA[0];

  constructor(private enterpriseService: EnterpriseService,
    private projectService: ProyectosService,
    private requestService: RequestService,
    private faseService: FaseService,
    private tareaService: TareaService,
    private areaService: AreaService,
    private registroActividadService: RegistroActividadService,
    private router: Router,
    private toastr: ToastrService,
    private login: AuthService) {

        this.registroActividadForm = new RegistroActividadModel();
        this.area = new AreaModel();
        this.registroActividadForm.areaId = localStorage.area;


    this.activity = [
        {id:1,client:"Bancoomeva",description:"Descripcion 1", req:"001",project:"Libranza",area:"Proyectos",fase:"Analisis",tarea:"Dudas",hourinitial:"14:00",hourfin:"16:30",duration:"2:30", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"},
        {id:2,client:"GTC", description:"Descripcion 2", req:"021",project:"CDA",area:"QA",fase:"Analisis",tarea:"Parametrizacion",hourinitial:"17:00",hourfin:"17:30",duration:"0:30", date:"Wed Jan 10 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)" },
        {id:3,client:"UTI", description:"Descripcion 3", req:"024",project:"Mobile",area:"Proyectos",fase:"Desarrollo",tarea:"Responsive",hourinitial:"8:00",hourfin:"18:0",duration:"10:00", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"},
        {id:4,client:"Coomeva",description:"Descripcion 4",req:"003",project:"Cartera",area:"Contabilidad",fase:"Entrega",tarea:"Cambios",hourinitial:"17:00",hourfin:"18:00",duration:"1:00", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"}
    ];

    this.respective = this.getRespective(this.viewDate,this.activity);

    /*this.rQ = [
        {id:1, code:"1003"},
        {id:2, code:"1004"},
        {id:3, code:"1005"},
        {id:4, code:"1006"},
        {id:5, code:"1007"}
    ];

    this.cL = [
        {id:1, name:"Interno"},
        {id:2, name:"Externo"},
    ];

    this.pR = [
        {id:1, name:"Proyecto 1"},
        {id:2, name:"Proyecto 2"},
    ];

    this.fA = [
        {id:1, name:"Fase 1"},
        {id:2, name:"Fase 2"},
    ];

    this.tA = [
        {id:1, name:"Tarea 1"},
        {id:2, name:"Tarea 2"},
    ];*/

   
  }

  //Inicializa los siguientes metodos

  ngOnInit() {

    this.loadAreaByEmployee();
    this.loadEnterprises();
    this.loadFases();
    this.loadTareas();
    //console.log("Primer Corte"+" "+this.varang.substr(0,5));
    //console.log("Segundo Corte"+" "+this.varang.substr(5,6));

}

  // Funciones -------------------------------------------

  //Extraer los datos correspondientes al dia presente

//Para cargar empresas

private loadEnterprises(): void {
    this.enterpriseService.getEnterprises().subscribe(res => {
        this.enterprises = res;
    }, (error) => {
        console.log(error);
        this.toastr.error("Error al cargar los datos de Empresa");
        // swal(
        //     'Error',
        //     error.error.message,
        //     'error'
        //   )
    });
}

// Trae el area del empleado en sesion
private loadAreaByEmployee(): void {
     this.areaService.getAreaById(localStorage.area).subscribe(res => {   
      
        this.area = res;

        console.log("LLEGO EL AREA");
        console.log(this.area);
  
      },(error)=>{
      
        this.toastr.error("Error al cargar los datos");
      });
}

// Carga todas las Fases
private loadFases(): void {
    this.faseService.getFases().subscribe(res => {
        this.fases = res;

    }, (error) => {
        console.log(error);
        this.toastr.error("Error al cargar los datos de Empresa");
    });
}

// carga todas las tareas
private loadTareas(): void {
    this.tareaService.getTareas().subscribe(res => {
        this.tareas = res;   

        },(error)=>{

            this.toastr.error("Error al cargar los datos");
        });
}

// Se cargan los proyectos segun la empresa seleccionada
loadProjectToEnterprise(id: any): void {

    this.registroActividadForm.proyectoId = undefined;
    this.registroActividadForm.requerimientoId = undefined;

    this.projectService.getProyectoByCliente(id).subscribe(res => {   
      
        this.projects = res;
        console.log(id);
        console.log(this.projects);
        
      },(error)=>{
      console.log(error);
      
  
        this.toastr.error("Error al cargar los datos");
      });
}

// Se cargan los requerimientos segun el proyecto seleccionado
loadRequestToProject(id: any): void {

    this.registroActividadForm.requerimientoId = undefined;
    
    this.requestService.getRequestByProject(id).subscribe(res => {   
      
        this.requests = res;
        console.log(id);
        console.log(this.requests);
        
      },(error)=>{
      console.log(error);
      
  
        this.toastr.error("Error al cargar los datos");
      });
}

  ret=[];

    datePre;

    dateFinal;

    setNew(id: any, section:string): void {
        console.log(id);

        /*if( section === "reqL"){
            this.curRq = this.rQ.filter(value => value.id === parseInt(id));
            this.activityForm.req = this.curRq[0].id;
            }

        if( section === "clientL"){
                this.curCl = this.cL.filter(value => value.id === parseInt(id));
                this.activityForm.client = this.curCl[0].id;
             }

        if( section === "projectL"){
                this.curPr = this.pR.filter(value => value.id === parseInt(id));
                this.activityForm.project = this.curPr[0].id;
             }

        if( section === "faseL"){
                this.curFa = this.cL.filter(value => value.id === parseInt(id));
                this.activityForm.fase = this.curFa[0].id;
             }

        if( section === "tareaL"){
                this.curTa = this.cL.filter(value => value.id === parseInt(id));
                this.activityForm.tarea = this.curTa[0].id;
        }*/

      }

    getRespective(date:Date, forach:any){

        for(let p of forach){

            date.setHours(0,0,0)

            this.datePre = date;

            this.dateFinal = this.datePre.toString();

                    if (this.dateFinal === p.date){
                        this.ret.push(p);
                    }
                }

   return this.ret;

    }

    //Funcion para calcular la duracion de la tarea

    getDifTime(initial:string, final:string){

        var initialHour = moment(initial,"HH: mm");

        var subtractHours =initialHour.diff(this.horaCero,'hours',true);

        var ret = moment(final,"HH: mm").subtract(subtractHours,'hours').format('HH:mm');

   return ret;

    }

    //Al darle guardar
    saveForm(){

        this.activityForm = {};

        this.disHFinal = true;

    }

    //Al darle editar

    editForm(data){

        console.log(data.hourfin);

        if(data.hourfin !== undefined){

            this.disHFinal = false;

        }

        this.submitText = "Actualizar";

    }

  events: CalendarEvent[] = [
    {
        start: undefined,
        title: 'A 3 day event',
        color: colors.red,
      },
      {
        start: undefined,
        title: 'An event with no end date',
        color: colors.yellow,
      },
      {
        start: undefined,
        title: 'A long event that spans 2 months',
        color: colors.blue
      },
      {
        start: undefined,
        title: 'A draggable and resizable event',
        color: colors.yellow,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = true;
    //   } else {
        this.activeDayIsOpen = true;
         this.viewDate = date;
         this.mes = date.toString().substr(4,3);
         this.dia = date.toString().substr(8,2);
         this.año = date.toString().substr(11,4);

         //Asignacion del numero del mes por la inicial
         if(this.mes==="Jan"){
             this.mes = "01";
         }else{
             if(this.mes==="Feb"){
                 this.mes="02";
             }else{
                 if(this.mes==="Mar"){
                     this.mes="03";
                 }else{
                     if(this.mes==="Apr"){
                        this.mes="04";
                     }else{
                         if(this.mes==="May"){
                            this.mes="05";
                         }else{
                             if(this.mes==="Jun"){
                                this.mes="06";
                             }else{
                                 if(this.mes==="Jul"){
                                    this.mes="07";
                                 }else{
                                     if(this.mes==="Aug"){
                                        this.mes="08";
                                     }else{
                                         if(this.mes==="Sep"){
                                            this.mes="09";
                                         }else{
                                             if(this.mes==="Oct"){
                                                this.mes="10";
                                             }else{
                                                 if(this.mes==="Nov"){
                                                    this.mes="11"
                                                 }else{
                                                     if(this.mes==="Dec"){
                                                        this.mes="12"
                                                     }else{
                                                         console.log("No existe el mes " + this.mes);
                                                     }
                                                 }
                                             }
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
             }
         }

         this.fechaTrabajo = this.año+"-"+this.mes+"-"+this.dia;

    this.registroActividadService.getRegistreByEmployeeAndDate(localStorage.empleado, this.fechaTrabajo).subscribe(res => {   
      
        this.registroActividad = res;
  
      },(error)=>{
      
        this.toastr.error("Error al cargar los datos");
      });

    this.submitText = "Guardar";

    }

    save():void{

        if (this.submitText === "Guardar"){

        console.log(this.viewDate);

        this.activityForm.date = this.viewDate.toString();

        if (this.activityForm.duration === "Invalid date"){

            this.activityForm.duration="";

        }

        console.log(this.activityForm);

        this.activity.push(this.activityForm);

        this.respective.push(this.activityForm);

        this.saveForm();

       }else{

        console.log("Actualizando..");

       }

    }

    onHInitial(time) { // without type info
        console.log(time);
        console.log(this.activityForm.hourinitial);

        var limitHour = moment(time,"HH:mm");

        console.log(limitHour);

        this.limitHour = limitHour.add(30,'minutes').format("HH:mm");

        console.log(this.limitHour);

        if (time !== ""){
            console.log("entré");
            this.disHFinal = false;
        }else{
            this.disHFinal = true;
            this.registroActividadForm.horaFin=undefined;
        }

        this.registroActividadForm.duracion= this.getDifTime(time,this.registroActividadForm.horaFin);

      }

      onHFinal(time) {

        this.registroActividadForm.duracion= this.getDifTime(this.registroActividadForm.horaInicio,time);

        // var initialHour = moment(this.activityForm.hourinitial,"HH: mm");

        // var subtractHours =initialHour.diff(this.horaCero,'hours',true);

      }

      edit(data) {

        console.log(this.activityForm);

        this.activityForm = {};

        console.log(data);

        this.activityForm  = data;

        this.editForm(data);

      }

  


}
