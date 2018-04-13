import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PermisoRoutingModule } from './permiso-routing.module';
import { PermisoComponent } from './permiso.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, PermisoRoutingModule, PageHeaderModule, FormsModule],
    declarations: [PermisoComponent]
})
export class PermisoModule {} 
