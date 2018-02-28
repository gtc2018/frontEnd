import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert2'

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterpriseComponent } from './enterprise.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule,
         EnterpriseRoutingModule,
          PageHeaderModule,
          FormsModule,
          HttpClientModule,
          NgbModule.forRoot ()],
    declarations: [EnterpriseComponent]
})
export class EnterpriseModule {}
