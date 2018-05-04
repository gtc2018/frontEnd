import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaseComponent } from './fase.component';

const routes: Routes = [
    {
        path: '', component: FaseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaseRoutingModule {
}
 