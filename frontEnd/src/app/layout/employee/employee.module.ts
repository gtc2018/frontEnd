import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { PageHeaderModule } from '../../shared/index';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploaderComponent } from './file-uploader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterEmployee } from './employee.filter';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
         EmployeeRoutingModule,
         PageHeaderModule,
        FormsModule,
        Ng2SmartTableModule,
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
        
    declarations: [EmployeeComponent,
        FileUploaderComponent,
        FilterEmployee,
        ModalQComponent,
        SystemComponent,
        ToolComponent,
        CreateDetailComponent,
        SystemComponent
    ],

    exports:[EmployeeComponent]
})
export class EmployeeModule {}
