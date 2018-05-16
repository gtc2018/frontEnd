import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { PageHeaderModule } from './../../shared';
import { FilterArea } from './area.filter';

@NgModule({
    imports: [CommonModule, AreaRoutingModule, PageHeaderModule, FormsModule],

    declarations: [AreaComponent,
        FilterArea]
})
export class AreaModule {}  
