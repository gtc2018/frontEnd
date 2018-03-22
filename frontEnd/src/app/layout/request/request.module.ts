import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';
import { PageHeaderModule } from '../../shared/index';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateRequestComponent } from './create-request/create-request.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,
         RequestRoutingModule,
          PageHeaderModule,
          Ng2SmartTableModule,
          NgbModule,
          FormsModule],

    // entryComponents: [
    //         ButtonViewComponent
    //       ],

    declarations: [RequestComponent,
        CreateRequestComponent]
})
export class RequestModule {}
