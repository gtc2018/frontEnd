import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ButtonViewComponent } from '../quotation/quotation.component';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    // styleUrls: ['./request.scss'],
    animations: [routerTransition()]
})
export class RequestComponent implements OnInit {

    //Variables

    request=[];

    //Titulo y filtros de la tabla

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
        id: {
            title: 'ID_RQM'
          },
          description: {
            title: 'Descripcion RQM'
          },
          client: {
            title: 'Cliente'
          },
          project: {
            title: 'Proyecto'
          },
          version: {
            title: 'Versión'
          },
          fase: {
            title: 'Fase RQM'
          },
          dateini: {
            title: 'Fecha Inicio DS'
          },
          datefin: {
            title: 'Fecha P. E. DS'
          },
          datefin2: {
            title: 'Fecha R. E. DS'
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
        //   action:{

        //     title:'Acciones',
        //     type:'custom',
        //     filter:false,
        //     renderComponent: ButtonViewComponent,
        // onComponentInitFunction(instance) {
        //   instance.save.subscribe(row => {
        //     alert(`${row.name} saved!`)
        //     console.log(row,'List');
        //   });

        // }

        //   }

        }
      };

      //Datos de la tabla

      data = [
          {
              id:"354"
          }
      ]


    //Funciones


    constructor() {}

    ngOnInit() {}


}
