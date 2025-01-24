/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './test/angular/rutas/home/home.component';
import { PageNotFoundComponent } from './test/angular/rutas/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./paginas/admin/admin_.module').then((m) => m.AdminModule),
  },
  {
    path: 'test',
    canActivate: [AuthGuard],
    loadChildren: () => import('./test/test_.module').then((m) => m.TestModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./paginas/login/login_.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {} */
