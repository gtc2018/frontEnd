import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';
import { PageHeaderModule } from './../../shared';
import { FilterSistema } from './sistema.filter';

@NgModule({
    imports: [CommonModule, SistemaRoutingModule, PageHeaderModule, FormsModule],
    
    declarations: [SistemaComponent,
        FilterSistema]
})
export class SistemaModule {}  
