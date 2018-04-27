import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalEmployeeComponent } from './externalEmployee.component';

const routes: Routes = [
    {
        path: '', component: ExternalEmployeeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExternalEmployeeRoutingModule {
}
