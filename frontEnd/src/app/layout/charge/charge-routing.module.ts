import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeComponent } from './charge.component';

const routes: Routes = [
    {
        path: '', component: ChargeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChargeRoutingModule {
}
