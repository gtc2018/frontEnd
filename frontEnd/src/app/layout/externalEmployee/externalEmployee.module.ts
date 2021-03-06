import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalEmployeeRoutingModule } from './externalEmployee-routing.module';
import { ExternalEmployeeComponent } from './externalEmployee.component';
import { PageHeaderModule } from '../../shared/index';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploaderComponent } from './file-uploader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterExternalEmployee } from './externalEmployee.filter';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [CommonModule,
         ExternalEmployeeRoutingModule,
         PageHeaderModule,
        FormsModule,
        Ng2SmartTableModule,
        NgbModule,
        MatCheckboxModule
        ],
    declarations: [ExternalEmployeeComponent,
        FileUploaderComponent,
        FilterExternalEmployee
    ]
})
export class ExternalEmployeeModule {}
