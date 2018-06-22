import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaneacionComponent } from './planeacion.component';

const routes: Routes = [
    {
        path: '', component: PlaneacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaneacionRoutingModule {
}
