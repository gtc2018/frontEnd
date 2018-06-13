import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';
import { PageHeaderModule } from '../../shared/index';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateRequestComponent } from './create-request/create-request.component';
import { FormsModule } from '@angular/forms';
import { FilterRequerimiento } from './request.filter';

import {MatCheckboxModule} from '@angular/material/checkbox';
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

@NgModule({
    imports: [CommonModule,
         RequestRoutingModule,
          PageHeaderModule,
          Ng2SmartTableModule,
          NgbModule,
          FormsModule,
           HttpClientModule,
           MatCheckboxModule,
           TagInputModule],

           entryComponents: [
            ModalQComponent,
            SystemComponent,
            ToolComponent,
            CreateDetailComponent
          ],

    declarations: [RequestComponent,
        CreateRequestComponent,
        FilterRequerimiento,
        ModalQComponent,
        ToolComponent,
        CreateDetailComponent,
        SystemComponent],
        
        exports:[RequestComponent]
})
export class RequestModule {}
