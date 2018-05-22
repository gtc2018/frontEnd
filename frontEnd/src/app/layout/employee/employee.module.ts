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

@NgModule({
    imports: [CommonModule,
         EmployeeRoutingModule,
         PageHeaderModule,
        FormsModule,
        Ng2SmartTableModule,
        NgbModule,
        MatCheckboxModule],
        
    declarations: [EmployeeComponent,
        FileUploaderComponent,
        FilterEmployee]
})
export class EmployeeModule {}
