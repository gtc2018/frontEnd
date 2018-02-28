import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationComponent } from './quotation.component';
import { CreateQuotationComponent } from './create-quotation/create-quotation.component';

const routes: Routes = [
    {
        path: '', component: QuotationComponent
    },
    {
        path:'create', component: CreateQuotationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuotationRoutingModule {
}
