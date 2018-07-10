import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InHouseComponent } from './inHouse.component';

const routes: Routes = [
    {
        path: '', component: InHouseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InHouseRoutingModule {
}
