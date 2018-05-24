import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterProyecto } from './proyectos.filter';

@NgModule({
    imports: [CommonModule,
         ProyectosRoutingModule,
          PageHeaderModule,
          FormsModule,
          NgbModule],
          
    declarations: [ProyectosComponent,
        FilterProyecto]
})
export class ProyectosModule {}
