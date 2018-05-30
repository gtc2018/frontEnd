import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { CreateRegistroActividadComponent } from './create-registroActividad/create-registroActividad.component';

const routes: Routes = [
    {
        path: '', component: ActivityComponent
    },
    {
        path:'create', component: CreateRegistroActividadComponent
    },
    {
        path:'create/:id', component: CreateRegistroActividadComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivityRoutingModule {
}
