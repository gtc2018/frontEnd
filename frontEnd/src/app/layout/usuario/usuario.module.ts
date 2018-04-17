import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from './../../shared';
import { BlueColorDirective } from './blue-color.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterAll } from '../../filters/search-table';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
    imports: [CommonModule,
         UsuarioRoutingModule,
          PageHeaderModule,
           HttpClientModule,
            FormsModule,
            NgbModule,
            MatCheckboxModule],

    declarations: [UsuarioComponent,
         BlueColorDirective,
        FilterAll]
})
export class UsuarioModule {

}
