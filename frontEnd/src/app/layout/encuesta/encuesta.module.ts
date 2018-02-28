import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { EncuestaComponent } from './encuesta.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, EncuestaRoutingModule, PageHeaderModule],
    declarations: [EncuestaComponent]
})
export class EncuestaModule {}
