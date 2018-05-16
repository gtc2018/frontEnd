import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { CargoRoutingModule } from './cargo-routing.module';
import { CargoComponent } from './cargo.component';
import { PageHeaderModule } from './../../shared';
import { FilterCargo } from './cargo.filter';

@NgModule({
    imports: [CommonModule, CargoRoutingModule, PageHeaderModule, FormsModule],
    
    declarations: [CargoComponent,
        FilterCargo]
})
export class CargoModule {}  
