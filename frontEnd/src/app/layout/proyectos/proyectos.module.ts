import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterProyecto } from './proyectos.filter';

import swal from 'sweetalert2'
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule } from 'angular-calendar';
import { ModalQComponent } from './modal-q/modal-q.component';
import { SystemComponent } from './modal-q/template/system/system';
import { ToolComponent } from './modal-q/template/tool/tool';
import { CreateDetailComponent } from './modal-q/template/create-detail/create-detail';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [CommonModule,
         ProyectosRoutingModule,
          PageHeaderModule,
          FormsModule,
          NgbModule,
         MatCheckboxModule,
          HttpClientModule,
          TagInputModule],

          entryComponents: [
            ModalQComponent,
            SystemComponent,
            ToolComponent,
            CreateDetailComponent,
            SystemComponent
          ],
          
    declarations: [ProyectosComponent,
        FilterProyecto,
        ModalQComponent,
        SystemComponent,
        ToolComponent,
        CreateDetailComponent,
        SystemComponent],

        exports:[ProyectosComponent]
})
export class ProyectosModule {}
