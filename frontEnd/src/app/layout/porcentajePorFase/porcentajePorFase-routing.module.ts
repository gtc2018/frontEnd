import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PorcentajePorFaseComponent } from './porcentajePorFase.component';

const routes: Routes = [
    {
        path: '', component: PorcentajePorFaseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PorcentajePorFaseRoutingModule {
}
