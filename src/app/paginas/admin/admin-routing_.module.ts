/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    loadChildren: () =>
      import('./dashboard/dashboard_.module').then((m) => m.DashboardModule),
  },
  {
    path: 'contratacion',
    component: AdminComponent,
    loadChildren: () =>
      import('./contratacion/contratacion_.module').then(
        (m) => m.ContratacionModule
      ),
  },
  {
    path: 'configuracion',
    component: AdminComponent,
    loadChildren: () =>
      import('./configuracion/configuracion_.module').then(
        (m) => m.ConfiguracionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {} */
