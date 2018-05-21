import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { EstadoRoutingModule } from './estado-routing.module';
import { EstadoComponent } from './estado.component';
import { PageHeaderModule } from './../../shared';
import { FilterEstado } from './estado.filter';

@NgModule({
    imports: [CommonModule, EstadoRoutingModule, PageHeaderModule, FormsModule],
    
    declarations: [EstadoComponent,
        FilterEstado]
})
export class EstadoModule {}  
