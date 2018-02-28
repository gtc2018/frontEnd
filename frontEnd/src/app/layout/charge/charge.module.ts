import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargeRoutingModule } from './charge-routing.module';
import { ChargeComponent } from './charge.component';
import { PageHeaderModule } from '../../shared/index';

@NgModule({
    imports: [CommonModule, ChargeRoutingModule, PageHeaderModule],
    declarations: [ChargeComponent]
})
export class ChargeModule {}
