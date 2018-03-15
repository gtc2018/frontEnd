import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'charge', loadChildren: './charge/charge.module#ChargeModule' },
            { path: 'usuarios', loadChildren: './usuario/usuario.module#UsuarioModule' },
            { path: 'cotizacion', loadChildren: './quotation/quotation.module#QuotationModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
            { path: 'enterprise', loadChildren: './enterprise/enterprise.module#EnterpriseModule' },
            { path: 'activity', loadChildren: './activity/activity.module#ActivityModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'seguridad', loadChildren: './seguridad/seguridad.module#SeguridadModule' },
            { path: 'proyectos', loadChildren: './proyectos/proyectos.module#ProyectosModule' },
            { path: 'request', loadChildren: './request/request.module#RequestModule' },
            { path: 'encuesta', loadChildren: './encuesta/encuesta.module#EncuestaModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
