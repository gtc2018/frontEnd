import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, ItemRoutingModule, PageHeaderModule, FormsModule],
    declarations: [ItemComponent]
})
export class ItemsModule {}
