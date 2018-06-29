import { Component, OnInit, ChangeDetectionStrategy, Input, } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityForm } from '../activityForm';
import * as moment from 'moment';

import { CalendarEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, subMinutes } from 'date-fns';
import { colors } from '../activity-utils/colors';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
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
import { CrearRegistroActividadService } from '../servicios/crear-registroActividad.service';

@Component({
  selector: 'app-create-registroActividad',
  templateUrl: './create-registroActividad.component.html',
  styleUrls: ['./create-registroActividad.component.scss'],
  providers: [ EnterpriseService, ProyectosService, RequestService, FaseService, TareaService, AreaService,
    RegistroActividadService, CrearRegistroActividadService]
})
export class CreateRegistroActividadComponent implements OnInit {

    //Variables ---------------------------------------------------

    
    private registroActividad: RegistroActividadModel[];
    private registroActividadComp: RegistroActividadModel[];
    private enterprises: EnterpriseModel[];
    private fases: FaseModel[];
    private tareas: TareaModel[];
    private projects: ProyectoModel[];
    private requests: RequerimientoModel[];
    private registroActividadForm: RegistroActividadModel;
    private registroActividadFormComp: RegistroActividadModel;
    private area: AreaModel;
    private isValid: boolean = true;
    filterEn:EnterpriseModel[];
    diaAct: number;
    mesAct:number;
    añoAct:number;


    submitText:string = "Guardar";
    mes:string;
    dia:string;
    año:string;
    fechaTrabajo:string;
    fechaAct: string;
    extraMin:string;
    extraH:string;
    descProyecto:string;
    descRequerimiento:string;
    diaTrabajoT:string;
    fotoEmpresa:String = "assets/images/logo.png";
    

    empleadoSes:number = 0;
    horaI:number = 0;
    horaF:number = 0;
    minutoI:number = 0;
    minutoF:number = 0;
    identificador: number = 0;
    mjsError: number = 0;
    editarReg:number = 0;
    diaTotalH:number = 0;
    diaTotalM:number = 0;
    sumaH:number = 0;
    sumaM:number = 0;

    activeDayIsOpen: boolean = true;
    proyecto: boolean = true;
    requerimiento: boolean = true;
    proyectolb: boolean = false;
    requerimientolb: boolean = false;
    crear:boolean = true;
    limpiar:boolean = false;
    newReg:boolean = true;
    edtReg:boolean = false;
    cancelarEdt: boolean = false;
    cancelarNew: boolean = true;
    validarHora: boolean = true;

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
    private crearRegistroActividadService: CrearRegistroActividadService,
    private router: Router,
    private toastr: ToastrService,
    private login: AuthService,
//    private _location: Location
    private route: ActivatedRoute
) {

        console.log(route.snapshot.params.id);
        this.registroActividadForm = new RegistroActividadModel();
        this.registroActividadFormComp = new RegistroActividadModel();
        this.area = new AreaModel();
        this.diaAct = new Date().getDate();
        this.mesAct = new Date().getMonth() + 1;
        this.añoAct = new Date().getFullYear();
        if(this.mesAct < 10){
            if(this.diaAct<10){
                this.fechaAct = this.añoAct+"-0"+this.mesAct+"-0"+this.diaAct;
            }else{
                this.fechaAct = this.añoAct+"-0"+this.mesAct+"-"+this.diaAct;
            }
        }else{
            if(this.diaAct<10){
                this.fechaAct = this.añoAct+"-"+this.mesAct+"-0"+this.diaAct;
            }else{
                this.fechaAct = this.añoAct+"-"+this.mesAct+"-"+this.diaAct;
            }
        }
        


    this.activity = [
        {id:1,client:"Bancoomeva",description:"Descripcion 1", req:"001",project:"Libranza",area:"Proyectos",fase:"Analisis",tarea:"Dudas",hourinitial:"14:00",hourfin:"16:30",duration:"2:30", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"},
        {id:2,client:"GTC", description:"Descripcion 2", req:"021",project:"CDA",area:"QA",fase:"Analisis",tarea:"Parametrizacion",hourinitial:"17:00",hourfin:"17:30",duration:"0:30", date:"Wed Jan 10 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)" },
        {id:3,client:"UTI", description:"Descripcion 3", req:"024",project:"Mobile",area:"Proyectos",fase:"Desarrollo",tarea:"Responsive",hourinitial:"8:00",hourfin:"18:0",duration:"10:00", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"},
        {id:4,client:"Coomeva",description:"Descripcion 4",req:"003",project:"Cartera",area:"Contabilidad",fase:"Entrega",tarea:"Cambios",hourinitial:"17:00",hourfin:"18:00",duration:"1:00", date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"}
    ];

    this.respective = this.getRespective(this.viewDate,this.activity);
   
  }

  //Inicializa los siguientes metodos

  ngOnInit() {

    this.loadInic();
    this.loadEnterprises();
    this.loadFases();
    this.loadTareas();
    console.log(this.fechaAct);

}

  // Funciones -------------------------------------------

//Para cargar empresas
private loadEnterprises(): void {
    this.enterpriseService.getEnterprises().subscribe(res => {
        this.enterprises = res;
    }, (error) => {
        console.log(error);
        this.toastr.error("Error al cargar los datos de Empresa");
    });
}

//Para cargar proyectos
private loadProject(): void{
    this.projectService.getProyectos().subscribe(res => {
        this.projects = res;
    }, (error) => {
        console.log(error);
        this.toastr.error("Error al cargar los datos de Proyectos");
    });
}

//Para cargar requerimientos
private loadRequest(): void{
    this.requestService.getAll().subscribe(res => {
        this.requests = res;
    }, (error) => {
        console.log(error);
        this.toastr.error("Error al cargar los datos de Requerimientos");
    });
}

//Registro de empleado en sesion
private loadEmployeeReg():void{

    this.registroActividadService.getRegistreByEmployeeAndDate(this.empleadoSes, this.fechaTrabajo).subscribe(res => {   
      
        this.registroActividad = res;
  
      },(error)=>{
      
        this.toastr.error("Error al cargar los datos");
      });
}

// Trae el area del empleado en sesion
private loadInic(): void {

    //En caso que el administrador desee editar un registro
    if(this.route.snapshot.params.id !== undefined){

        this.editarReg = this.route.snapshot.params.id;
        this.registroActividadService.getRegistroActividadById(this.route.snapshot.params.id).subscribe(res => {   
      
            this.edit(res);
            this.registroActividadForm.empleadoId = res.empleado.id;
            this.fechaTrabajo = this.registroActividadForm.fechaTrabajo.toString();
            this.empleadoSes = res.empleado.id;
            this.newReg = false;
            this.edtReg = true;
            this.crear = true;
            this.limpiar = false;
            this.cancelarEdt = true;
            this.cancelarNew = false;
            this.loadEmployeeReg();

            this.areaService.getAreaById(res.area.id).subscribe(res => {   
      
                this.area = res;
                this.registroActividadForm.areaId = this.area.id;
          
              },(error)=>{
              
                this.toastr.error("Error al cargar los datos");
              });
      
          },(error)=>{
          
            this.toastr.error("Error al cargar los datos");
          });
    }else{

        this.registroActividadForm.empleadoId = localStorage.empleado;
        this.registroActividadForm.areaId = localStorage.area;
        this.empleadoSes = localStorage.empleado;
    
        this.areaService.getAreaById(localStorage.area).subscribe(res => {   
      
        this.area = res;
  
      },(error)=>{
      
        this.toastr.error("Error al cargar los datos");
      });
    }
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

//Imagen empresa
pics(id): void{

    this.filterEn = this.enterprises.filter(value => value.id === parseInt(id));

        this.fotoEmpresa = this.filterEn[0].imagenEmpresa;
};

// Se cargan los proyectos segun la empresa seleccionada
loadProjectToEnterprise(id: any): void {

    //Se limpian los campos de proyecto y requerimiento
    this.registroActividadForm.proyectoId = undefined;
    this.registroActividadForm.requerimientoId = undefined;

    //se carga el logo de la empresa
    this.pics(id);

    //se ejecuta el servicio de traer proyectos por clientes
    this.projectService.getProyectoByCliente(id).subscribe(res => {   
      
        this.projects = res;
        //Se desactiva el label de proyecto
        this.proyectolb = false;
        //Se activa la lista desplegable
        this.proyecto = true;

        if(res.length === 0){
            this.toastr.warning("No hay proyectos asociados a este cliente");
        }
        
      },(error)=>{
  
        this.toastr.error("Error al cargar los datos");
      });
}

// Se cargan los requerimientos segun el proyecto seleccionado
loadRequestToProject(id: any): void {

    //Se limpia el campo de requerimiento
    this.registroActividadForm.requerimientoId = undefined;
    
    //Se ejecuta el servicio de traer requerimientos por proyecto
    this.requestService.getRequestByProjectAndEmployee(id, localStorage.empleado).subscribe(res => {   
      
        this.requests = res;
        this.requerimientolb = false;
        this.requerimiento = true;

        if(this.requests.length === 0){
            this.toastr.warning("No hay requerimientos disponibles");
        }
        
      },(error)=>{
  
        this.toastr.error("Error al cargar los datos");
      });
}

  ret=[];

    datePre;

    dateFinal;

    setNew(id: any, section:string): void {
        console.log(id);

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

    //Para guardar
    saveR():void{

        // Le asignamos el usuario de creacion o modificacion
        if(this.registroActividadForm.id === null){
            this.registroActividadForm.usuarioCreacion = this.login.authUser.email.toString();
        }else{
            this.registroActividadForm.usuarioModificacion = this.login.authUser.email.toString();
        }

        this.registroActividadForm.diaTotal = this.registroActividadForm.duracion;
            
        this.crearRegistroActividadService.saveOrUpdate(this.registroActividadForm).subscribe(res => {
            this.toastr.success('Transacción satisfactoria', 'Gestión de Registro de Actividad');
            this.clean();
            this.loadEmployeeReg();
            this.mjsError = 0;
                                
        },(error)=>{
                    
            this.toastr.error(error.error.message,"Error en la transacción");
        });

    }

    prueba():void{

        //Validamos que los campos no esten vacios
        this.isValid = this.validate(this.registroActividadForm);

        if(this.isValid){

            this.validarHora = this.validarHoras(this.registroActividadForm);

            if(this.validarHora){

                this.registroActividadService.getRegistreByEmployeeAndDate(this.empleadoSes, this.fechaTrabajo).subscribe(res => {

                    this.registroActividadComp = res;
                    if(this.registroActividadComp.length === 0){

                        this.saveR();

                    }else{

                        this.registroActividadService.getAllRegistreByDate(this.empleadoSes, this.fechaTrabajo,
                             this.registroActividadForm.horaInicio, this.registroActividadForm.horaFin).subscribe(res => {

                                if(res.length === 0){
                                    this.saveR();
                                }else{
                                    this.toastr.warning("No se puede guardar el registro ya que existe uno dentro del rango");
                                }

                        },(error)=>{
                            this.toastr.error("Error al cargar los datos para guardar");
                        });

                    }
                    
                },(error)=>{
                    this.toastr.error("Error al cargar los datos para guardar");
                });

            }else{
                this.toastr.warning("La hora o minutos de inicio no pueden ser mayor a las finales");    
            }
            
        }else{
            //Si algun campo esta vacio
            this.toastr.warning("Se deben llenar todos los campos y seleccionar una fecha");
        }
    }

    


    //Antes de guardar
    saveOrUpdate():void{

        //Se extrae los minutos de la hora inicial
        this.extraMin = this.registroActividadForm.horaInicio.toString().substr(3,2);

        //Se asignan los minutos de la hora inicial
        this.minutoI = parseInt(this.extraMin);

        //Se extrae los minutos de la hora final
        this.extraMin = this.registroActividadForm.horaFin.toString().substr(3,2);

        //Se asignan los minutos de la hora final
        this.horaF = parseInt(this.extraMin);

        //Se compara la hora de inicio es igual fin
        if(parseInt(this.registroActividadForm.horaInicio) === parseInt(this.registroActividadForm.horaFin)){
            if(this.minutoI>this.horaF){

                //Mensaje de error cuando la hora de inicio es mayor a la inicial
                this.mjsError = 3
            }
        }else{
            // Se compara la hora de inicio es mayor a la hora final
            if(parseInt(this.registroActividadForm.horaInicio) > parseInt(this.registroActividadForm.horaFin)){

                this.mjsError = 3
            }
        }

        //Termina el proceso por que la hora inicial es mayor a la final
        if(this.mjsError === 3){
            this.toastr.error("La hora final no puede ser menor o igual a la inicial");
            this.mjsError = 0;
            return;
        }        

        // Se carga todos los registros con la fecha de trabajo y empleado 
        this.registroActividadService.getRegistreByEmployeeAndDate(this.empleadoSes, this.fechaTrabajo).subscribe(res => {   

            //SE ESTA TRABAJANDO EN ESTA PARTE PARA SUMAR EL DIA TOTAL LABORADO ***********************************************************
            /*if(this.registroActividadForm === null){
                this.diaTotalH = parseInt(this.registroActividadForm.duracion);
                this.diaTotalM = parseInt(this.registroActividadForm.duracion.toString().substr(3,2));
            }else{
             this.diaTotalH = this.diaTotalH - parseInt(this.registroActividadForm.duracion)
             this.diaTotalM = this.diaTotalM - parseInt(this.registroActividadForm.duracion.toString().substr(3,2))
            }

            for(let h of res){
                this.diaTotalH = this.diaTotalH + parseInt(h.duracion);
                this.diaTotalM = this.diaTotalM + parseInt(h.duracion.toString().substr(3,2));
            }

            if(this.diaTotalH < 10){
                this.diaTrabajoT= "0"+ this.diaTotalH.toString();
                this.diaTotalH = 0
            }else{
                this.diaTrabajoT = this.diaTotalH.toString();
                this.diaTotalH = 0;
            }

            if(this.diaTotalM < 10){
                this.diaTrabajoT = this.diaTrabajoT+":0"+this.diaTotalM.toString();
                this.diaTotalM = 0;
            }else{
                this.diaTrabajoT = this.diaTrabajoT+":"+this.diaTotalM.toString();
                this.diaTotalM = 0
            }*/

            console.log("Dia total del trabajo : "+this.diaTrabajoT);
            //***************************************************************************************************************************** 

            // Se asigna los resultados del servicio a la variable
            this.registroActividadComp = res;

            //Se valida si no hay registros en la trama para verificar si es el primer registro del dia
            if(this.registroActividadComp.length === 0){
                
                // Le asignamos el usuario de creacion o modificacion
                if(this.registroActividadForm.id === null){
                    this.registroActividadForm.usuarioCreacion = this.login.authUser.email.toString();
                }else{
                    this.registroActividadForm.usuarioModificacion = this.login.authUser.email.toString();
                }
                
                //Validamos que los campos no esten vacios
                this.isValid = this.validate(this.registroActividadForm);

                if(this.isValid){

                    // Se esta trabajando en el dia total **********************************************
                    this.registroActividadForm.diaTotal = this.registroActividadForm.duracion;
                    //********************************************************* 
                
                    console.log(this.registroActividadForm);

                    //Se envia el registro que se debe guardar mediante el servicio
                    this.crearRegistroActividadService.saveOrUpdate(this.registroActividadForm).subscribe(res => {
                        this.toastr.success('Transacción satisfactoria', 'Gestión de Registro de Actividad');
                        this.clean();// Limpio los campos
                        this.loadEmployeeReg();//Cargo los registros
                        this.mjsError = 0;//Anulo el mensaje de error
                    
                        //En caso que no se pueda guardar el registro
                    },(error)=>{

                            this.toastr.error(error.error.message,"Error en la transacción al guardar");
                            return;
                    });

                }else{
                    //Si algun campo esta vacio
                    this.toastr.error("Se deben llenar todos los campos y seleccionar una fecha");
                    return;
                }

            }else{
            
                //Se recorre la trama 
                for(let h of this.registroActividadComp){
    
                    //Se extrae la hora final
                    this.extraMin = h.horaFin.toString().substr(3,2);
    
                    //Se asigna la hora final
                    this.minutoF = parseInt(this.extraMin);
    
                    //Se extrae la hora de inicio
                    this.extraMin = h.horaInicio.toString().substr(3,2);
    
                    //se asigna la hora de inicio
                    this.horaI = parseInt(this.extraMin);
    
                    //Si las horas iniciales son iguales
                    if(parseInt(h.horaInicio) === parseInt(this.registroActividadForm.horaInicio)){
    
                        console.log("LAS HORAS INICIALES SON IGUALES");
                       
                        //Hora inicial es igual a la hora final
                        if(parseInt(this.registroActividadForm.horaInicio) === parseInt(h.horaFin)){
    
                            console.log("LAS HORAS INICIAL Y FINAL SON IGUALES");
    
                            //Comparar que los minutos sean mayores al de la hora final
                            if(this.minutoI < this.minutoF){
    
                                console.log("No permite guardar el registro pq se encuentra dentro del rango");
                                this.mjsError = 1;
                                this.toastr.error("Ya existe una actividad dentro del rango de la hora");
                                this.mjsError = 0;
                                return;
    
                            }else{
                                console.log("Se debe permitir pq son distintos minutos");
                                this.mjsError = 2;
                            };
    
                        }else{
                            console.log("No permite guardar el registro pq se encuentra dentro del rango");
                            this.mjsError = 1;
                            
                        };
                        
                    }else{
                        //Si la hora inicial es menor a la hora de los registros
                        if(parseInt(this.registroActividadForm.horaInicio) < parseInt(h.horaInicio)){
    
                            console.log("LA HORA DE INICIO ES MENOR A LA HORA INICIO DEL REGISTRO");
    
                            //Si la hora final es igual a la de inicio
                            if(parseInt(this.registroActividadForm.horaFin) === parseInt(h.horaInicio)){
    
                                console.log("LA HORA FIN ES IGUAL A LA HORA DE INICIO");
    
                                // Los minutos de la hora final deben ser menor a los de la hora inicial de los registros
                                if(this.horaF < this.horaI){
                                    console.log("Se permite pq esta fuera de los minutos iniciales");
                                    this.mjsError = 2;
                                }else{
                                    console.log("No permite pq esta dentro del rango");
                                    this.mjsError = 1;
                                    this.toastr.error("Ya existe una actividad dentro del rango de la hora");
                                    this.mjsError = 0;
                                    return;
                                }
    
                            }else{
                                // La hora final esta por debajo de la hora inicial
                                if(parseInt(this.registroActividadForm.horaFin) < parseInt(h.horaInicio)){
                                    console.log("Se debe permitir guardar pq la hora final esta por debajo de la inicial");
                                    this.mjsError = 2;
                                }else{
                                    console.log("No debe permitir guardar pq esta por encima de la hora inicial");
                                    this.mjsError = 1;
                                }
                            }
    
                        }else{
                            //Si la hora de inicio es menor a la hora fin
                            if(parseInt(this.registroActividadForm.horaInicio) < parseInt(h.horaFin)){
                                console.log("No debe permitir guardar pq esta dentro del rango");
                                this.mjsError = 1;
                            }else{
                                //Si la hora de inicio es igual a la hora final del registro
                                if(parseInt(this.registroActividadForm.horaInicio) === parseInt(h.horaFin)){
    
                                    //Si los minutos de la consulta son menores al del registro
                                    if(this.minutoF < this.horaI){
                                        console.log("Permite guardar pq los minutos son mayores al de la hora del registro");
                                        this.mjsError = 2;
                                    }else{
                                        console.log("No permite guardar pq los minutos del registro son mayores");
                                        this.mjsError = 1;
                                    }
                                }else{
                                    console.log("Es mayor la hora de inicio a la hora del registro");
                                    this.mjsError = 2;
                                }
                            }
                        }
                    }
    
                };
    
                //Se Valida el mensaje de error 1
                if( this.mjsError === 1 ){
                    this.toastr.error("Ya existe una actividad dentro del rango de la hora");
                    this.mjsError = 0;
                }else{
                    //Solo permite guardar si llega con 2
                    if(this.mjsError === 2){
    
                        //Asigna el usuario de creacion o modificacion
                        if(this.login.authUser !== undefined){
                            if(this.registroActividadForm.id === null){
                                this.registroActividadForm.usuarioCreacion = this.login.authUser.email.toString();
                            }else{
                                this.registroActividadForm.usuarioModificacion = this.login.authUser.email.toString();
                            }
                        }
        
                        this.isValid = this.validate(this.registroActividadForm);
            
                        //Valida los campos
                        if(this.isValid){
                        
                            this.saveR();
            
                        }else{
                            //Si algun campo esta vacio
                            this.toastr.error("Se deben llenar todos los campos y seleccionar una fecha");
                            return;
                        }

                    }else{
                            this.toastr.error("Ya existe una actividad dentro del rango de la hora");
                            this.mjsError = 0;
                    }
                }   
            }
          },(error)=>{
          
            this.toastr.error("Error al cargar los datos");
          });

    }

    ajustarFormatos(){

        this.registroActividadForm.duracion = this.registroActividadForm.duracion + ":00";
        this.registroActividadForm.horaInicio = this.registroActividadForm.horaInicio + ":00";
        this.registroActividadForm.horaFin = this.registroActividadForm.horaFin + ":00";
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

    if(this.route.snapshot.params.id !== undefined){

        this.toastr.warning("Al editar registros, no esta disponible esta opcion");

    }else{

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

         //Se arma la fecha de trabajo
         this.fechaTrabajo = this.año+"-"+this.mes+"-"+this.dia;

         this.registroActividadForm.fechaTrabajo = this.fechaTrabajo;

         //Carga los registros del empleado
         this.loadEmployeeReg();

         this.submitText = "Guardar";

    }
      
    };

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

        this.limitHour = limitHour.add(1,'minutes').format("HH:mm");

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

      }

      //Editamos el contenido
      edit(data) {
        
        this.registroActividadForm = data;
        this.registroActividadForm.clienteId = this.registroActividadForm.cliente.id;
        this.registroActividadForm.proyectoId = this.registroActividadForm.proyecto.id;
        this.registroActividadForm.requerimientoId = this.registroActividadForm.requerimiento.id;
        this.registroActividadForm.faseId = this.registroActividadForm.fase.id;
        this.registroActividadForm.tareaId = this.registroActividadForm.tarea.id;
        this.descProyecto = this.registroActividadForm.proyecto.descripcion;
        this.descRequerimiento = this.registroActividadForm.requerimiento.descripcion;
        this.proyecto = false;
        this.requerimiento = false;
        this.proyectolb = true;
        this.requerimientolb = true;

        this.pics(this.registroActividadForm.cliente.id);

        if(this.route.snapshot.params.id !== undefined){

        this.registroActividadForm.areaId = this.registroActividadForm.area.id;
        this.registroActividadForm.empleadoId = this.registroActividadForm.empleado.id;

        this.crear = true;
        this.limpiar = false;
        }else if(this.registroActividadForm.fechaTrabajo === this.fechaAct){

            this.crear = true;
            this.limpiar = false;
        }else{
            this.crear = false;
            this.limpiar = true;

        }
        

      }

      //Validacion:

    public validate(registroActividadForm: RegistroActividadModel): boolean {
        let isValid = true;

        if (!registroActividadForm.horaFin) {
            isValid = false;
        }

        if (!registroActividadForm.horaInicio) {
            isValid = false;
        }

        if (!registroActividadForm.tareaId) {
            isValid = false;
        }

        if (!registroActividadForm.faseId) {
            isValid = false;
        }

        if (!registroActividadForm.areaId) {
            isValid = false;
        }

        if (!registroActividadForm.requerimientoId) {
            isValid = false;
        }

        if (!registroActividadForm.proyectoId) {
            isValid = false;
        }

        if (!registroActividadForm.clienteId) {
            isValid = false;
        }

        if (!registroActividadForm.descripcion) {
            isValid = false;
        }

        return isValid;
    }

    //Valida las horas
    public validarHoras(registroActividadForm: RegistroActividadModel) : boolean{
        let validarHora = true;

        //Se extrae los minutos de la hora inicial
        this.extraMin = this.registroActividadForm.horaInicio.toString().substr(3,2);

        //Se asignan los minutos de la hora inicial
        this.minutoI = parseInt(this.extraMin);

        //Se extrae los minutos de la hora final
        this.extraMin = this.registroActividadForm.horaFin.toString().substr(3,2);

        //Se asignan los minutos de la hora final
        this.horaF = parseInt(this.extraMin);

        //Se compara la hora de inicio es igual fin
        if(parseInt(this.registroActividadForm.horaInicio) === parseInt(this.registroActividadForm.horaFin)){
            if(this.minutoI>this.horaF){
                validarHora = false;
            }
        }else{
            // Se compara la hora de inicio es mayor a la hora final
            if(parseInt(this.registroActividadForm.horaInicio) > parseInt(this.registroActividadForm.horaFin)){

                validarHora = false;
            }
        }

        return validarHora
    }

    //Limpiar Campos
    clean(){
        this.registroActividadForm = new RegistroActividadModel();
        this.descProyecto = undefined;
        this.descRequerimiento = undefined;
        this.registroActividadForm.areaId = this.area.id;
        this.registroActividadForm.empleadoId = localStorage.empleado;
        this.crear = true;
        this.limpiar = false;
        this.fotoEmpresa = "assets/images/logo.png";
    }


}
