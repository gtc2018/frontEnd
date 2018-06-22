import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaneacionRoutingModule } from './planeacion-routing.module';
import { PlaneacionComponent } from './planeacion.component';
import { PageHeaderModule } from '../../shared/index';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploaderComponent } from './file-uploader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPlaneacion} from './planeacion.filter';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [CommonModule,
         PlaneacionRoutingModule,
         PageHeaderModule,
        FormsModule,
        Ng2SmartTableModule,
        NgbModule,
        MatCheckboxModule
        ],
    declarations: [PlaneacionComponent,
        FileUploaderComponent,
        FilterPlaneacion
    ]
})
export class PlaneacionModule {}
