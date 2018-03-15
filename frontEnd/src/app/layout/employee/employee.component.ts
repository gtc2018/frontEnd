import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultEditor } from 'ng2-smart-table';
import {FileUploaderComponent} from './file-uploader.component';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.html',
    styleUrls: ['./employee.scss'],
    animations: [routerTransition()]
})
export class EmployeeComponent implements OnInit   {
    icon: string = "fa fa-caret-left";
    visible: boolean = false;
    //Metodos principales
    constructor() {
    }


    ngOnInit() {
        console.log(this);
    }

    //Variables

    dragging: boolean = false;
    activeColor: string = 'green';
    baseColor: string = '#ccc';

    imageSrc: string = 'assets/images/avatar.png';

    public input: string = '<input type="checkbox" [checked]="true" >';

    settings = {

        actions:false,
        // {
        //     columnTitle:"Acciones",
        //     add:false,
        //     position:'right'
        // },

    // edit: {
    //     editButtonContent: '<a (click)="save()" class="btn btn-default"><i class="fa fa-pencil" aria-hidden="true"  title="Editar" ></i></a>',
    //     saveButtonContent: '<a class="btn btn-default"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>',
    //     cancelButtonContent: '<i class="fa fa-times fa-lg" aria-hidden="true"></i>',
    //   },

    //   delete: {
    //     deleteButtonContent: '<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>',
    //     confirmDelete: true
    //   },
        columns: {
        nombres: {
            title: 'Nombres'
          },
          apellidos: {
            title: 'Apellidos'
          },
          document: {
            title: '#Documento'
          },
          telefono: {
            title: 'Telefono'
          },
          email: {
            title: 'Email'
          },
          state:  {
            title: 'Passed',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<input type="text" >`;
                },
            filter: {
              type: 'checkbox',
              config: {
                true: '0',
                false: '1',
                resetText: 'clear',
              },
              },
            },
          action:{

            title:'Acciones',
            type:'custom',
            filter:false,
            renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.edit.subscribe(row => {
            alert(`${row.name} edit!`)
            console.log(row,'List');
          });
          instance.deleteEvent.subscribe(row => {
            alert(`${row.name} delete!`)
            console.log(row,'List');
          }

        );

        }

          }

        }

    }

        data = [
            {
            nombres:'Anggelo Jose',
            apellidos:"Moncada Viera",
            document:"000339281",
            telefono:"13123134",
            email:"anggelo@gestecon.net",
             state:1
            },

            {
            nombres:'Fabian',
            apellidos:"Zamorano",
            document:"00029412",
            telefono:"2233145",
            email:"Fabian@gestecon.net",
             state:0
            },
            {
            nombres:'Fabian',
            apellidos:"Zamorano",
            document:"00029412",
            telefono:"2233145",
            email:"Fabian@gestecon.net",
             state:true
            },
            {
            nombres:'Fabian',
            apellidos:"Zamorano",
            document:"00029412",
            telefono:"2233145",
            email:"Fabian@gestecon.net",
             state:"1"
            },
            {
            nombres:'IVAN',
            apellidos:"Zamorano",
            document:"0000012",
            telefono:"2233145",
            email:"Fabian@gestecon.net",
             state:"true"
            }

        ];


        // Funciones

        createHide() {
            this.visible = !this.visible;

            if(this.visible === true){

                this.icon = "fa fa-caret-down";

            }else{

                this.icon= "fa fa-caret-left";

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
            this.imageSrc = reader.result;
        }

      };
