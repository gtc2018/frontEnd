import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { AlcanceRoutingModule } from './alcance-routing.module';
import { AlcanceComponent } from './alcance.component';
import { PageHeaderModule } from './../../shared';
import { FilterAlcance } from './alcance.filter';

@NgModule({
    imports: [CommonModule, AlcanceRoutingModule, PageHeaderModule, FormsModule],
    
    declarations: [AlcanceComponent,
        FilterAlcance]
})
export class AlcanceModule {}  
