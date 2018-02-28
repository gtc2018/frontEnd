import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';

import { CalendarModule } from 'angular-calendar';
import { ActivityUtilsModule } from './activity-utils/module';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared/index';

@NgModule({
    imports: [CommonModule,
         ActivityRoutingModule,
          PageHeaderModule,
          FormsModule,
          CalendarModule.forRoot(),
          ActivityUtilsModule],

    declarations: [ActivityComponent],

    exports:[ActivityComponent]
})
export class ActivityModule {}
