import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import swal from 'sweetalert2'

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterpriseComponent } from './enterprise.component';

import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './enterprise.filter';

import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared/index';
import { ModalQComponent } from './modal-q/modal-q.component';
import { SystemComponent } from './modal-q/template/system/system';
import { ToolComponent } from './modal-q/template/tool/tool';
import { CreateDetailComponent } from './modal-q/template/create-detail/create-detail';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    imports: [CommonModule,
        EnterpriseRoutingModule,
         PageHeaderModule,
         FormsModule,
         HttpClientModule,
         NgbModule,
         MatCheckboxModule,
         TagInputModule,
         Ng2SmartTableModule],

         entryComponents: [
           ModalQComponent,
           SystemComponent,
           ToolComponent,
           CreateDetailComponent,
           SystemComponent
         ],


   declarations: [EnterpriseComponent,
       ModalQComponent,
   SystemComponent,
   ToolComponent,
   CreateDetailComponent,
   SystemComponent,
   FilterPipe],

   exports:[EnterpriseComponent]
})
export class EnterpriseModule {}
