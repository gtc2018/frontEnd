import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';

import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomRenderComponent } from './custom-render.component';
import { CreateRegistroActividadComponent } from './create-registroActividad/create-registroActividad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared/index';
import { ActivityUtilsModule } from './activity-utils/module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { FilterActivity } from './activity.filter'; 

@NgModule({
    imports: [CommonModule,
         ActivityRoutingModule,
          PageHeaderModule,
          FormsModule,
          CalendarModule.forRoot(),
          ActivityUtilsModule,
          Ng2SmartTableModule,
          NgbModule,
          MatCheckboxModule,
          TagInputModule],

          entryComponents: [
            CustomRenderComponent
          ],

    declarations: [ActivityComponent,
        CustomRenderComponent,
        CreateRegistroActividadComponent,
        FilterActivity],

    exports:[ActivityComponent]
})
export class ActivityModule {}
