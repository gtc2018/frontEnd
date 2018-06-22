import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { InHouseRoutingModule } from './inHouse-routing.module';
import { InHouseComponent } from './inHouse.component';
import { PageHeaderModule } from './../../shared';
import { FilterInHouse } from './inHouse.filter';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';

import swal from 'sweetalert2'
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    imports: [CommonModule, 
        InHouseRoutingModule, 
        PageHeaderModule, 
        FormsModule,
        Ng2SmartTableModule,
        NgbModule,
        MatCheckboxModule,
        HttpClientModule,
        TagInputModule],

        

    declarations: [InHouseComponent,
        FilterInHouse],

        exports:[InHouseComponent]
})
export class InHouseModule {}  
