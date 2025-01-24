import { Routes } from '@angular/router';
import { DashboardComponent } from '../paginas/admin/dashboard/dashboard.component';
import { AdminComponent } from '../paginas/admin/admin.component';
import { LoginComponent } from '../paginas/login/login/login.component';
import { RegisterComponent } from '../paginas/login/register/register.component';
import { PageNotFoundComponent } from '../paginas/page-not-found/page-not-found.component';
import { EmpresaComponent } from '../paginas/admin/configuracion/empresa/empresa.component';
import { PrimerProcesoComponent } from '../paginas/admin/contratacion/contrato/primer-proceso/primer-proceso.component';
import { AuthGuard } from '../guards/auth.guard';
import { SegundoProcesoComponent } from '../paginas/admin/contratacion/contrato/segundo-proceso/segundo-proceso.component';
import { TercerProcesoComponent } from '../paginas/admin/contratacion/contrato/tercer-proceso/tercer-proceso.component';
import { CuartoProcesoComponent } from '../paginas/admin/contratacion/contrato/cuarto-proceso/cuarto-proceso.component';
import { QuintoProcesoComponent } from '../paginas/admin/contratacion/contrato/quinto-proceso/quinto-proceso.component';
import { QuintoProcesoBComponent } from '../paginas/admin/contratacion/contrato/quinto-proceso-b/quinto-proceso-b.component';
import { QuintoProcesoCComponent } from '../paginas/admin/contratacion/contrato/quinto-proceso-c/quinto-proceso-c.component';
import { QuintoProcesoDComponent } from '../paginas/admin/contratacion/contrato/quinto-proceso-d/quinto-proceso-d.component';
import { SextoProcesoComponent } from '../paginas/admin/contratacion/contrato/sexto-proceso/sexto-proceso.component';
import { SextoProcesoBComponent } from '../paginas/admin/contratacion/contrato/sexto-proceso-b/sexto-proceso-b.component';
import { SextoProcesoCComponent } from '../paginas/admin/contratacion/contrato/sexto-proceso-c/sexto-proceso-c.component';
import { SextoProcesoDComponent } from '../paginas/admin/contratacion/contrato/sexto-proceso-d/sexto-proceso-d.component';
import { SextoProcesoEComponent } from '../paginas/admin/contratacion/contrato/sexto-proceso-e/sexto-proceso-e.component';
import { SextoProcesoFComponent } from '../paginas/admin/contratacion/contrato/sexto-proceso-f/sexto-proceso-f.component';
import { OctavoProcesoComponent } from '../paginas/admin/contratacion/contrato/octavo-proceso/octavo-proceso.component';
import { OctavoProcesoBComponent } from '../paginas/admin/contratacion/contrato/octavo-proceso-b/octavo-proceso-b.component';
import { OctavoProcesoAComponent } from '../paginas/admin/contratacion/contrato/octavo-proceso-a/octavo-proceso-a.component';
import { NovenoProcesoComponent } from '../paginas/admin/contratacion/contrato/noveno-proceso/noveno-proceso.component';
import { DecimoProcesoComponent } from '../paginas/admin/contratacion/contrato/decimo-proceso/decimo-proceso.component';
import { UndecimoProcesoComponent } from '../paginas/admin/contratacion/contrato/undecimo-proceso/undecimo-proceso.component';
import { DuodecimoProcesoComponent } from '../paginas/admin/contratacion/contrato/duodecimo-proceso/duodecimo-proceso.component';
import { SeptimoProcesoComponent } from '../paginas/admin/contratacion/contrato/septimo-proceso/septimo-proceso.component';
import { MaquetaComponent } from '../test/maqueta/maqueta.component';
import { ContactComponent } from '../test/angular/contact/contact.component';
import { TestComponent } from '../test/test.component';
import { Pagina1Component } from '../test/angular/localstorage/pagina1/pagina1.component';
import { Pagina2Component } from '../test/angular/localstorage/pagina2/pagina2.component';
import { ToastrComponent } from '../test/angular/toastr/toastr.component';
import { UploadComponent } from '../test/angular/upload/upload.component';
import { FormularioValidacionesComponent } from '../test/angular/formulario-validaciones/formulario-validaciones.component';
import { PdfComponent } from '../test/angular/pdf/pdf.component';
import { InterpolacionComponent } from '../test/angular/interpolacion/interpolacion.component';
import { EventBindingComponent } from '../test/angular/event-binding/event-binding.component';
import { ClassBindingComponent } from '../test/angular/class-binding/class-binding.component';
import { FormularioComponent } from '../test/angular/formulario/formulario.component';
import { PropertyBindingComponent } from '../test/angular/property-binding/property-binding.component';
import { NgifComponent } from '../test/angular/ngif/ngif.component';
import { ChildrenComponent } from '../test/angular/children/children.component';
import { HomeComponent } from '../test/angular/rutas/home/home.component';
import { UserDetailsComponent } from '../test/angular/rutas/user-details/user-details.component';
import { Formulario2Component } from '../test/angular/formulario2/formulario2.component';
import { AddCategoryComponent } from '../test/angular/crud/add-category/add-category.component';
import { ListCategoryComponent } from '../test/angular/crud/list-category/list-category.component';
import { WelcomeComponent } from '../test/carga-perezosa/welcome/welcome.component';
import { BlogComponent } from '../test/carga-perezosa/blog/blog.component';
import { BotonesComponent } from '../test/tailwind/botones/botones.component';
import { AlertasComponent } from '../test/tailwind/alertas/alertas.component';
import { CardsComponent } from '../test/tailwind/cards/cards.component';
import { LoginFormComponent } from '../test/tailwind/login-form/login-form.component';
import { GridComponent } from '../test/tailwind/grid/grid.component';
import { ContainerComponent } from '../test/tailwind/layout/container/container.component';
import { PositionComponent } from '../test/tailwind/layout/position/position.component';
/* import { LayoutComponent } from './test/tailwind/layout/layout/layout.component'; */
import { StickyComponent } from '../test/tailwind/layout/sticky/sticky.component';
import { FlexboxBasicoComponent } from '../test/tailwind/flexbox/flexbox-basico/flexbox-basico.component';
import { ImplementacionDirectivaComponent } from '../test/angular/implementacion-directiva/implementacion-directiva.component';
import { EjemploPermisosComponent } from '../test/angular/ejemplo-permisos/ejemplo-permisos.component';
import { AdminGuard } from '../guards/admin.guard';
import { EmpleadorGuard } from '../guards/empleador.guard';
import { TrabajadorGuard } from '../guards/trabajador';
import { PortalComponent } from '../paginas/login/portal/portal.component';
import { LayoutUnoComponent } from '../layout/layout-uno/layout-uno.component';
import { LayoutDosComponent } from '../layout/layout-dos/layout-dos.component';
import { LayoutComponent } from '../layout/layout.component';
import { LayoutTresComponent } from '../layout/layout-tres/layout-tres.component';

export const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [TrabajadorGuard],
        component: DashboardComponent,
      },
      {
        path: 'configuracion/empresa',
        canActivate: [AdminGuard],
        component: EmpresaComponent,
      },
      {
        path: 'contratacion',
        canActivate: [EmpleadorGuard],
        children: [
          {
            path: 'contrato',
            children: [
              { path: 'proceso_1', component: PrimerProcesoComponent },
              { path: 'proceso_2', component: SegundoProcesoComponent },
              { path: 'proceso_3', component: TercerProcesoComponent },
              { path: 'proceso_4', component: CuartoProcesoComponent },
              { path: 'proceso_5_a', component: QuintoProcesoComponent },
              { path: 'proceso_5_b', component: QuintoProcesoBComponent },
              { path: 'proceso_5_c', component: QuintoProcesoCComponent },
              { path: 'proceso_5_d', component: QuintoProcesoDComponent },
              { path: 'proceso_6', component: SextoProcesoComponent },
              { path: 'proceso_6_b', component: SextoProcesoBComponent },
              { path: 'proceso_6_c', component: SextoProcesoCComponent },
              { path: 'proceso_6_d', component: SextoProcesoDComponent },
              { path: 'proceso_6_e', component: SextoProcesoEComponent },
              { path: 'proceso_6_f', component: SextoProcesoFComponent },
              { path: 'proceso_7', component: SeptimoProcesoComponent },
              { path: 'proceso_8', component: OctavoProcesoComponent },
              { path: 'proceso_8_a', component: OctavoProcesoAComponent },
              { path: 'proceso_8_b', component: OctavoProcesoBComponent },
              { path: 'proceso_9', component: NovenoProcesoComponent },
              { path: 'proceso_10', component: DecimoProcesoComponent },
              { path: 'proceso_11', component: UndecimoProcesoComponent },
              { path: 'proceso_12', component: DuodecimoProcesoComponent },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'test',

    component: TestComponent,
    children: [
      {
        path: 'maqueta',
        canActivate: [TrabajadorGuard],
        component: MaquetaComponent,
      },
      {
        path: 'angular',
        canActivate: [AdminGuard],
        children: [
          {
            path: 'contact',
            component: ContactComponent,
          },
          {
            path: 'localstorage',
            children: [
              {
                path: 'pagina1',
                component: Pagina1Component,
              },
              {
                path: 'pagina2',
                component: Pagina2Component,
              },
            ],
          },
          {
            path: 'toastr',
            component: ToastrComponent,
          },
          {
            path: 'upload',
            component: UploadComponent,
          },
          {
            path: 'formulario-validaciones',
            component: FormularioValidacionesComponent,
          },
          {
            path: 'pdf',
            component: PdfComponent,
          },
          {
            path: 'interpolacion',
            component: InterpolacionComponent,
          },
          {
            path: 'event-binding',
            component: EventBindingComponent,
          },
          {
            path: 'class-binding',
            component: ClassBindingComponent,
          },
          {
            path: 'formulario',
            component: FormularioComponent,
          },
          {
            path: 'property-binding',
            component: PropertyBindingComponent,
          },
          {
            path: 'ngif',
            component: NgifComponent,
          },
          {
            path: 'children',
            component: ChildrenComponent,
          },
          {
            path: 'rutas/home',
            component: HomeComponent,
          },
          {
            path: 'user-details',
            component: UserDetailsComponent,
          },
          /* {
            path:'rutas/page-not-found',
            
          }, */
          {
            path: 'formulario2',
            component: Formulario2Component,
          },
          {
            path: 'crud',
            children: [
              {
                path: 'add-category',
                component: AddCategoryComponent,
              },
              {
                path: 'list-category',
                component: ListCategoryComponent,
              },
            ],
          },
          {
            path: 'directiva-1',
            component: ImplementacionDirectivaComponent,
          },
          {
            path: 'ejemplo-permisos',
            component: EjemploPermisosComponent,
          },
        ],
      },
      /* {
      path:'carga-perezosa',
      children:[
        {
          path:'welcome',
          component:WelcomeComponent
        },
        {
          path:'blog',
          component:BlogComponent,
        }
      ]
    }, */
      {
        path: 'tailwind',
        canActivate: [AdminGuard],
        children: [
          {
            path: 'botones',
            component: BotonesComponent,
          },
          {
            path: 'alertas',
            component: AlertasComponent,
          },
          {
            path: 'cards',
            component: CardsComponent,
          },
          {
            path: 'login-form',
            component: LoginFormComponent,
          },
          {
            path: 'grid',
            component: GridComponent,
          },
          {
            path: 'layout/container',
            component: ContainerComponent,
          },
          {
            path: 'layout/position',
            component: PositionComponent,
          },
          /* {
            path: 'layout/layout',
            component: LayoutComponent,
          }, */
          {
            path: 'sticky',
            component: StickyComponent,
          },
          {
            path: 'flexbox-basico',
            component: FlexboxBasicoComponent,
          },
        ],
      },
      /* {
      path:'maqueta',
      children:[
        {
          path:'dashboard',
        }
      ]
    } */
    ],
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'layout-uno',
        component: LayoutUnoComponent,
      },
      {
        path: 'layout-dos',
        component: LayoutDosComponent,
      },
      {
        path: 'layout-tres',
        component: LayoutTresComponent,
      },
    ],
  },
  {
    path: '',
    /* canActivate: [AuthGuard], */
    redirectTo: '/admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    /* canActivate: [AuthGuard], */ component: PageNotFoundComponent,
  },
];
