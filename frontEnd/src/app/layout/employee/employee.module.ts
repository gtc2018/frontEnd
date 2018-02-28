import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { PageHeaderModule } from '../../shared/index';

@NgModule({
    imports: [CommonModule, EmployeeRoutingModule, PageHeaderModule],
    declarations: [EmployeeComponent]
})
export class EmployeeModule {}
