import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { HerramientaRoutingModule } from './herramienta-routing.module';
import { HerramientaComponent } from './herramienta.component';
import { PageHeaderModule } from './../../shared';
import { FilterHerramienta } from './herramienta.filter';

@NgModule({
    imports: [CommonModule, HerramientaRoutingModule, PageHeaderModule, FormsModule],
    
    declarations: [HerramientaComponent,
        FilterHerramienta]
})
export class HerramientaModule {}  
