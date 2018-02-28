import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, subMinutes } from 'date-fns';
import { colors } from './activity-utils/colors';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivityForm } from './activityForm';
import * as moment from 'moment';
import { routerTransition } from '../../router.animations';

@Component({
    // moduleId: __moduleName,
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './activity.html',
    styleUrls: ['./activity.scss'],
    animations: [routerTransition()]
})
export class ActivityComponent implements OnInit {
    //Variables

    submitText:string = "Guardar";

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

  //Extraer los datos correspondientes al dia presente

  ret=[];

    datePre;

    dateFinal;

    setNew(id: any, section:string): void {
        console.log(id);

        if( section === "reqL"){
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
             }

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

  //Funciones

  ngOnInit() {


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
    //   }

    // }
    console.log(date);

    this.respective = [];

    for(let p of this.activity){

console.log(p.date);

        if (date.toString() === p.date){

            this.respective.push(p);

        }
    }

    console.log(this.respective);

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
            this.activityForm.hourfin=undefined;
        }

        this.activityForm.duration= this.getDifTime(time,this.activityForm.hourfin);

      }

      onHFinal(time) {

        this.activityForm.duration= this.getDifTime(this.activityForm.hourinitial,time);

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

  constructor() {

    this.activity = [
        {id:1,client:"Bancoomeva",description:"Descripcion 1", req:"001",project:"Libranza",area:"Proyectos",fase:"Analisis",tarea:"Dudas",hourinitial:"14:00",hourfin:"16:30",duration:"2:30", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"},
        {id:2,client:"GTC", description:"Descripcion 2", req:"021",project:"CDA",area:"QA",fase:"Analisis",tarea:"Parametrizacion",hourinitial:"17:00",hourfin:"17:30",duration:"0:30", date:"Wed Jan 10 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)" },
        {id:3,client:"UTI", description:"Descripcion 3", req:"024",project:"Mobile",area:"Proyectos",fase:"Desarrollo",tarea:"Responsive",hourinitial:"8:00",hourfin:"18:0",duration:"10:00", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"},
        {id:4,client:"Coomeva",description:"Descripcion 4",req:"003",project:"Cartera",area:"Contabilidad",fase:"Entrega",tarea:"Cambios",hourinitial:"17:00",hourfin:"18:00",duration:"1:00", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"}
    ];

    this.respective = this.getRespective(this.viewDate,this.activity);

    this.rQ = [
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
    ];

    // var horaCero = moment('00:00','HH: mm');
    // var initialHour = moment('11:30',"HH: mm");
    // var b = moment('12:45',"HH: mm");
    // console.log(b.diff(initialHour,'hours'));// 86400000

    // var initial =initialHour.diff(horaCero,'hours',true);

    // console.log(initial);

    // console.log(moment('12:45',"HH: mm").subtract(initial,'hours').format('HH:mm'));

    // var c = b.diff(a,'minutes');

    // var d = moment.duration(c,'minutes');

    // console.log(b.subtract(d).minutes());



    // var s = moment('12:45',"HH: mm").subtract(c,'minutes');

    // console.log(moment().subtract);

    // console.log(moment(b));



    // console.log(c);

    // var d = moment(c,);

  }

}
