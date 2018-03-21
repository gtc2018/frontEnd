import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import {FileUploaderComponent} from './file-uploader.component';
import { EmployeeModel } from '../../model/employee';
import { EnterpriseModel } from '../../model/enterprise';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/guard/auth.service';


@Component({
    selector: 'app-employee',
    templateUrl: './employee.html',
    styleUrls: ['./employee.scss'],
    animations: [routerTransition()],
    providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit   {

    //Metodos principales---------------------
    constructor(private employeeService: EmployeeService,
        private router: Router,
        private toastr: ToastrService,
        private login:AuthService) {

        this.employeeForm = new EmployeeModel();

        if(this.login.authUser !== undefined){

            console.log(this.login.authUser.usuarioId);

        }

        this.employeeForm.foto = 'assets/images/avatar.png';

        this.employee = [

            {id:1,
            name:"Santiago Carrillo",
            apellido:"Alzate Papá",
            document:"1144078370",
            telefono:"3754547",
            email:"santiagoca42@gmail.com",
            estado:'1',
            foto:'assets/images/Scan.jpg'},

            {id:2,
            name:"Santiago Carrillo",
            apellido:"Alzate Papá",
            document:"1144078370",
            telefono:"3754547",
            email:"santiagoca42@gmail.com",
            estado:'1',
            foto:'assets/images/avatar.png'}

        ]

    }


    ngOnInit() {
    }

    //Variables--------------------------------------------

    user: string;

    messageEmail: string;
    emailRegex: RegExp;

    dragging: boolean = false;
    deleteFormHide:boolean = false;
    stateExpand: number = 1;
    visible: boolean = false;

    activeColor: string = 'green';
    baseColor: string = '#ccc';
    icon: string = "fa fa-caret-left";

    employeeForm: EmployeeModel;
    employee= [];

    filter: EmployeeModel = new EmployeeModel();


    imageSrc: string = 'assets/images/avatar.png';

    public input: string = '<input type="checkbox" [checked]="true" >';

        // Funciones

        clean(){

            this.employeeForm = new EmployeeModel();

            this.deleteFormHide = false;
        }

        upload(model){

            console.log(model);

            console.log(this.stateExpand);

            if( this.stateExpand === 1 ){
                this.visible = !this.visible;

            if(this.visible === true){
                this.icon = "fa fa-caret-down";

                this.deleteFormHide = false;
            }else{
                this.icon= "fa fa-caret-left";
            }
            this.deleteFormHide = true;

            this.employeeForm = model;
            this.stateExpand = 3;

            }else if( this.stateExpand === 2 || this.stateExpand === 3 ){
                this.employeeForm = model;
                this.stateExpand = 3;
                this.deleteFormHide = true;
            }

               }

        createHide() {

            console.log(this.stateExpand);

            if( this.stateExpand === 3 ){

                this.employeeForm = new EmployeeModel();

                this.employeeForm.foto = 'assets/images/avatar.png';

                this.stateExpand = 2;

                this.deleteFormHide = false;

            }else if( this.stateExpand === 1 ){

            this.visible = !this.visible;

            if(this.visible === true){

                this.icon = "fa fa-caret-down";

            }else{

                this.icon= "fa fa-caret-left";

            }

            this.stateExpand = 2

            // this.stateExpand = true;
        }else
        if( this.stateExpand === 2 ){

            this.visible = !this.visible;

            if(this.visible === true){

                this.icon = "fa fa-caret-down";

            }else{

                this.icon= "fa fa-caret-left";

            }
            this.stateExpand = 1
        }

    }

        handleDragEnter() {
            this.dragging = true;
        }

        handleDragLeave() {
            this.dragging = false;
        }

        handleDrop(e) {
            e.preventDefault();
            this.dragging = false;
            this.handleInputChange(e);
        }

        handleInputChange(e){

            var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        console.log(file);

        var pattern = /image-*/;
        var reader = new FileReader();
        console.log(reader);

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        // this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
        }

        _handleReaderLoaded(e) {
            var reader = e.target;

            console.log(reader.result);
            this.employeeForm.foto = reader.result;
        }

      };
