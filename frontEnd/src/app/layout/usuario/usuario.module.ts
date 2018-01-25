import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from './../../shared';
import { BlueColorDirective } from './blue-color.directive';



@NgModule({
    imports: [CommonModule, UsuarioRoutingModule, PageHeaderModule, HttpClientModule, FormsModule],
    declarations: [UsuarioComponent, BlueColorDirective]
})
export class UsuarioModule {
   
}
