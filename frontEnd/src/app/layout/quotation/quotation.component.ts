
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Ng2SmartTableModule, ViewCell } from 'ng2-smart-table';
import { filter } from 'rxjs/operators/filter';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';


@Component({
    selector: 'button-view',
    template: `<div class="btn-group">
    <a class="btn btn-default" >
    <i (click)="upload()"
     class="fa fa-pencil-square-o fa-lg hand"
     aria-hidden="true"
     title="Editar" >
     </i>
    </a>
     <a class="btn btn-default">
      <i (click)="delete()"
      class="fa fa-trash-o fa-lg hand"
      aria-hidden="true"
      title="Eliminar">
      </i>
      </a>
</div>`,

styleUrls: ['./quotation.scss']
  })
  export class ButtonViewComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() edit: EventEmitter<any> = new EventEmitter();

    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
      this.renderValue = this.value.toString().toUpperCase();
    }

    upload() {
        console.log("Para actualizar");
       this.edit.emit(this.rowData);
    }

    delete(){
        console.log("Para borrar");

        this.deleteEvent.emit(this.rowData);
    }
  }



@Component({
    templateUrl: './quotation.html',
    styleUrls: ['./quotation.scss'],
    animations: [routerTransition()]
})
export class QuotationComponent implements OnInit {
    //Variables

    quotation = [];

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
        quotation: {
            title: '# Cotización'
          },
          client: {
            title: 'Cliente'
          },
          project: {
            title: 'Proyecto'
          },
          coderqm: {
            title: 'Codigo RQM'
          },
          state: {
            title: 'Estado'
          },
          system: {
            title: 'Sistema'
          },
          tool: {
            title: 'Herramienta'
          },
          date: {
            title: 'Fecha'
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
      };

      data = [
        {
        id:1,
        quotation:"COT00001",
        client:"Bancoomeva",
         project:"Core Tarjeta",
         coderqm:"RQM05191",
         state:"Generada",
         system:"AS400",
         tool:"RPG",
         date:"02/01/2018",
         action:"d"

        },
        {
        id:1,
        quotation:"COT00002",
        client:"Bancoomeva",
         project:"Core Tarjeta",
         coderqm:"RQM03020",
         state:"Generada",
         system:"AS400",
         tool:"RPG",
         date:"05/01/2018"
        }

    ];

  //Funciones

  save():void{
      console.log("dsads");
  }

  ngOnInit() {

    console.log(this);

    }

    onDeleteConfirm(event): void {
        if (window.confirm('Desea eliminar el registro seleccionado?')) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      }

      new():void{
          console.log("nuevo registro");
      }

  constructor(private router:Router) {

    console.log(router);

    this.quotation = [
        {
        id:1,
        quotation:"Bancoomeva",
        client:"Descripcion 1",
         project:"001",
         coderqm:"Libranza",
         state:"Proyectos",
         system:"Analisis",
         tool:"Dudas",
         date:"Fri Jan 12 2018 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)"
        }

    ];

    `<div class="btn-group">
         <a class="btn btn-default" >
         <i (click)="save()"  class="fa fa-pencil" aria-hidden="true"title="Editar" ></i>
         </a>
          <a class="btn btn-default">
           <i (click)="save()" class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
           </a>
     </div>`

  }

}
