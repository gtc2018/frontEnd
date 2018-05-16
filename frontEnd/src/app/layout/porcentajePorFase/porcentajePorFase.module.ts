import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { PorcentajePorFaseRoutingModule } from './porcentajePorFase-routing.module';
import { PorcentajePorFaseComponent } from './porcentajePorFase.component';
import { PageHeaderModule } from './../../shared';
import { FilterPorcentaje } from './porcentajePorFase.filter';

@NgModule({
    imports: [CommonModule, PorcentajePorFaseRoutingModule, PageHeaderModule, FormsModule],

    declarations: [PorcentajePorFaseComponent,
        FilterPorcentaje]
})
export class PorcentajePorFaseModule {}  
