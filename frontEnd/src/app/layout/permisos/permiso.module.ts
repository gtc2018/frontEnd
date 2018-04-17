import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PermisoRoutingModule } from './permiso-routing.module';
import { PermisoComponent } from './permiso.component';
import { PageHeaderModule } from './../../shared';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule,
         PermisoRoutingModule,
          PageHeaderModule,
           FormsModule,
           MatCheckboxModule,
           NgbModule],
    declarations: [PermisoComponent]
})
export class PermisoModule {}
