import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';

import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomRenderComponent } from './custom-render.component';
import { CreateQuotationComponent } from './create-quotation/create-quotation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared/index';
import { ModalQComponent } from './modal-q/modal-q.component';
import { SystemComponent } from './modal-q/template/system/system';
import { ToolComponent } from './modal-q/template/tool/tool';
import { CreateDetailComponent } from './modal-q/template/create-detail/create-detail';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    imports: [CommonModule,
         QuotationRoutingModule,
          PageHeaderModule,
          FormsModule,
          Ng2SmartTableModule,
          NgbModule,
          MatCheckboxModule,
          TagInputModule],

          entryComponents: [
            CustomRenderComponent,
            ModalQComponent,
            SystemComponent,
            ToolComponent,
            CreateDetailComponent,
            SystemComponent
          ],

    declarations: [QuotationComponent,
        CustomRenderComponent,
        CreateQuotationComponent,
    ModalQComponent,
    SystemComponent,
    ToolComponent,
    CreateDetailComponent,
    SystemComponent],

    exports:[QuotationComponent]
})
export class QuotationModule {}
