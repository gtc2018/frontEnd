import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,
         ProyectosRoutingModule,
          PageHeaderModule,
          FormsModule],
    declarations: [ProyectosComponent]
})
export class ProyectosModule {}
