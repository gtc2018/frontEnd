import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SeguridadComponent } from './seguridad.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, SeguridadRoutingModule, PageHeaderModule],
    declarations: [SeguridadComponent]
})
export class SeguridadModule {}
