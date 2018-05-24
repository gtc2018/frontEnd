import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { PageHeaderModule } from './../../shared';
import { FilterTarea } from './tarea.filter';

@NgModule({
    imports: [CommonModule, TareaRoutingModule, PageHeaderModule, FormsModule],
    
    declarations: [TareaComponent,
        FilterTarea]
})
export class TareaModule {}  
