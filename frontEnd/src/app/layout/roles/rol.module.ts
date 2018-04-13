import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { RolRoutingModule } from './rol-routing.module';
import { RolComponent } from './rol.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, RolRoutingModule, PageHeaderModule, FormsModule],
    declarations: [RolComponent]
})
export class RolModule {} 
