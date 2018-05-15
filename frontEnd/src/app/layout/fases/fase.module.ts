import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FaseRoutingModule } from './fase-routing.module';
import { FaseComponent } from './fase.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, FaseRoutingModule, PageHeaderModule, FormsModule],
    declarations: [FaseComponent]
})
export class FaseModule {}
