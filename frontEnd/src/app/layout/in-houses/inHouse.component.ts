import { LoginService } from './../../login/servicios/login.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { Router } from '@angular/router';
import { InHouseModel } from '../../model/in-house.model';
import { PermisoModel } from '../../model/permiso.model';

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InHouseService } from './inHouse.service';
import { OK } from '../../messages/httpstatus';
import { MenuService } from '../menus/servicios/menu.service';
import { ItemService } from '../items/servicios/item.service';
import { ItemsModel } from '../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../shared/guard/auth.service';
import { EnterpriseModel } from '../../model//enterprise';
import { EnterpriseService } from '../enterprise/enterprise.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
    selector: 'app-inHouse',  
    templateUrl: './inHouse.component.html', 
    styleUrls: ['./inHouse.component.scss'],
    animations: [routerTransition()],
    providers: [InHouseService, EnterpriseService, LoginService] 
})
export class InHouseComponent implements OnInit {

    // Variables -----------------------------

    enterprises: EnterpriseModel[];
    inHouses: InHouseModel[];

    inHouseForm: InHouseModel;
    filter: InHouseModel = new InHouseModel();
    private permiso: PermisoModel;

    message: string;
    messageEmail: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";
    imageSrc: string = 'assets/images/avatar.png';
    antFechD: string;
    antFechH: string;
    mes:string;
    año:string;
    dia:string;

    stateExpand: number = 1;

    emailRegex: RegExp;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    visible: boolean = false;
    cancelar:boolean = false;
    private isValid: boolean = true;
    private isValidFechas: boolean = true;

    user: any;
    items: any;
    menus: any;

    crear = false;
    editar = false;
    eliminar = false;
    leer = false;

    // Metodos principales----------------------------------------------------
    constructor(
        private inHouseService: InHouseService,
        private enterpriseService: EnterpriseService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService,
        private menu: LoginService,
        private menup: LoginService
    ) {
        this.inHouseForm = new InHouseModel();
    }

    // Se inicia con estos metodos
    ngOnInit() {
        this.getItems();  
        this.loadInHouses(); 
    } 

    //Funciones --------------------------------------------

    //Cargar InHouses

    private loadInHouses(): void {
        this.inHouseService.getInHouse().subscribe(res => {
            this.inHouses = res;  
            
            for(let i of this.inHouses){

                i.desde = i.desde.toString().substr(0,10);
                i.hasta = i.hasta.toString().substr(0,10);
            }

            },(error)=>{
                this.toastr.error("Error al cargar los datos");
            });
    }

    //Cambiamos el formato de las fechas
    public formatoFechas(){

        if(this.inHouseForm.desde){
            this.inHouseForm.desde=this.formatoFecha(this.inHouseForm.desde);
         }
         if(this.inHouseForm.hasta){
            this.inHouseForm.hasta=this.formatoFecha(this.inHouseForm.hasta);
         }
    }

    //Filtrar por fechas
    filterDate(): void{

        this.isValid = this.validate(this.inHouseForm);
        if(this.isValid){

            this.antFechD = this.inHouseForm.desde;
            this.antFechH = this.inHouseForm.hasta;

            this.formatoFechas();
            this.isValidFechas = this.validarFechas();

            if(this.isValidFechas){

                this.inHouseService.getInHouseByDate(this.inHouseForm.desde, this.inHouseForm.hasta).subscribe(res => { 
 
                    if(res.length !== 0){
                        
                        this.inHouses = res;

                        for(let i of this.inHouses){

                            i.desde = i.desde.toString().substr(0,10);
                            i.hasta = i.hasta.toString().substr(0,10);
                        }
                        
                        this.gameDate();
                        this.cancelar = true;

                    }else{
                        this.toastr.error("No existen registros en el rango", "Error en la transacción")
                        this.gameDate();
                    }
                },(error)=>{ 

                    this.toastr.error(error.error.message,"Error en la transacción");
                    this.gameDate();
        
                });

            }else{
                this.gameDate();
                this.toastr.error(this.message,"Error en la transacción");
                this.message = undefined;
            }

        }else{
            this.toastr.error(this.message,"Error en la transacción");
            this.message = undefined;
        }

    }

    //Se arma la fecha segun el query solicitado
    public formatoFecha(fecha): string {
        let fechaString ="";
        if(fecha['month'] < 10){
            this.mes = "0"+fecha['month'];
        }else{
            this.mes = fecha['month'];
    
        }
        if(fecha['day']< 10){
            this.dia = "0"+ fecha['day'];
        }else{
            this.dia = fecha['day'];
        }
    
        fechaString = fecha['year']+"-"+this.mes+"-"+this.dia;
        
        return fechaString;
    }

    //Guardar o editar Area
    save():void{

    }

    // Eliminar Area
    delete(id) {

    }

    // Se limpia los campos
    clean() {

        this.inHouseForm = new InHouseModel;
        this.loadInHouses();
        this.cancelar = false;

      }

    //Validacion:

    public validate(inHouseForm: InHouseModel): boolean {
        let isValid = true;

        console.log(this.inHouseForm);

        if(this.inHouseForm.desde === undefined){
            this.message = "Falto seleccionar una fecha para filtrar";
            return false;
        }

        if(this.inHouseForm.hasta === undefined){
            this.message = "Falto seleccionar una fecha para filtrar";
            return false;
        }

        return isValid;
    }

    //Se valida que la fecha de inicio no sea mayor a la fin
    public validarFechas():boolean{
        let isValidFechas=true;
    
        
        if( parseInt(this.inHouseForm.desde.toString().substr(0,4)) > parseInt(this.inHouseForm.hasta.toString().substr(0,4))){
    
            this.message= 'el año de la primera fecha no puede ser mayor a la segunda';
            isValidFechas = false;
    
        }else if(parseInt(this.inHouseForm.desde.toString().substr(0,4)) === parseInt(this.inHouseForm.hasta.toString().substr(0,4))){
    
            if(parseInt(this.inHouseForm.desde.toString().substr(5,2)) > parseInt(this.inHouseForm.hasta.toString().substr(5,2))){
    
                this.message= 'el mes de la primera fecha no puede ser mayor a la segunda';
                isValidFechas = false;
    
            }else if(parseInt(this.inHouseForm.desde.toString().substr(5,2)) === parseInt(this.inHouseForm.hasta.toString().substr(5,2))){
    
                if(parseInt(this.inHouseForm.desde.toString().substr(8,2)) > parseInt(this.inHouseForm.hasta.toString().substr(8,2))){
    
                    this.message= 'el dia de la primera fecha no puede ser mayor a la segunda';
                    isValidFechas = false;
    
                }
            }
        }
           
        return isValidFechas
    }

    //Se regresan las fechas
    gameDate(): void{
        this.inHouseForm.desde = this.antFechD;
        this.inHouseForm.hasta = this.antFechH;
    }

    // Replica el modelo
    upload(model){        
    }

    //Permisos
    private getItems(): void {

        this.permiso = new PermisoModel();
        // this.login.authUser.rolId;
        this.permiso.rolId = localStorage.rol;
        this.menu.loadMenus(this.permiso).subscribe(res => {
            console.log("======================= PERMISOS Empleados: ==============");

            this.menus = res;
            for (let menu of this.menus) {
                //this.items = menu.item;
                if (menu.menu.descripcion === "Areas") {
                    this.items = menu;

                    if (this.items.crear === 1) {
                        this.crear = true;
                    }

                    if (this.items.editar === 1) {
                        this.editar = true;
                    }

                    if (this.items.eliminar === 1) {
                        this.eliminar = true;
                    }

                    if (this.items.leer === 1) {
                        this.leer = true;
                    }

                }

            }


        }, (error) => {
        });
    }
}
