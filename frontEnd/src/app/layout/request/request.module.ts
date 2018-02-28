import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';
import { PageHeaderModule } from '../../shared/index';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonViewComponent } from '../quotation/quotation.component';

@NgModule({
    imports: [CommonModule,
         RequestRoutingModule,
          PageHeaderModule,
          Ng2SmartTableModule],

    // entryComponents: [
    //         ButtonViewComponent
    //       ],

    declarations: [RequestComponent]
})
export class RequestModule {}
