import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './request.component';
import { CreateRequestComponent } from './create-request/create-request.component';

const routes: Routes = [
    {
        path: '', component: RequestComponent
    },
    {
        path:'create', component: CreateRequestComponent
    },
    {
        path:'create/:id', component: CreateRequestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestRoutingModule {
}
