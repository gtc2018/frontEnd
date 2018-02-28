
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { ButtonViewComponent } from './quotation/quotation.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        ToastrModule.forRoot(), // ToastrModule added
        NgbDropdownModule.forRoot()
    ],

    entryComponents: [
        ButtonViewComponent
      ],
    declarations: [LayoutComponent,
         SidebarComponent,
          HeaderComponent,
          ButtonViewComponent]
})
export class LayoutModule {}
