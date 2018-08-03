import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterFase } from './fase.filter'; 

import { FaseRoutingModule } from './fase-routing.module';
import { FaseComponent } from './fase.component';
import { PageHeaderModule } from './../../shared';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';

@NgModule({
    imports: [CommonModule, FaseRoutingModule, PageHeaderModule, FormsModule,InlineEditorModule],
    declarations: [FaseComponent, FilterFase]
})
export class FaseModule {}
