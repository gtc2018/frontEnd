import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlcanceComponent } from './alcance.component';

const routes: Routes = [
    {
        path: '', component: AlcanceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlcanceRoutingModule {
}
