import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, MenuRoutingModule, PageHeaderModule, FormsModule],
    declarations: [MenuComponent]
})
export class MenuModule {}
