import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { VistaComponent } from './pages/vista/vista.component';
import { InicioComponent } from './pages/vista/inicio/inicio.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CursosComponent } from './pages/vista/cursos/cursos.component';

/* import { AdminGuard } from './guards/admin.guard';
import { EmpleadorGuard } from './guards/empleador.guard';
import { TrabajadorGuard } from './guards/trabajador'; */
import { AuthGuard } from './guards/auth.guard';

/* ---------------------------------------------------------------------- */

import { PortalComponent } from './paginas/login/portal/portal.component';
import { LayoutComponent } from './layout/layout.component';
import { ListTabla1Component } from './pages/admin/componente1/tabla1/list-tabla1/list-tabla1.component';

export const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  /*  {
    path: '',
    component: VistaComponent,
    children: [
      {
        path: '',
        component: InicioComponent,
      },
      {
        path: 'cursos',
        component: CursosComponent,
      },
      {
        path: 'ver-curso',
        component: VerCursoComponent,
      },
    ],
  }, */
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: 'banners',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/banners/banners.component').then(
            (m) => m.BannersComponent
          ),
      },
      {
        path: 'update/file',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/banners/update-file/update-file.component'
          ).then((m) => m.UpdateFileComponent),
      },
      /* {
        path: 'mision',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/mision/mision.component').then(
            (m) => m.MisionComponent
          ),
      },
      {
        path: 'mision/update/file',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/mision/update-file-mision/update-file-mision.component'
          ).then((m) => m.UpdateFileMisionComponent),
      },
      {
        path: 'mision/update',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/mision/update-mision/update-mision.component'
          ).then((m) => m.UpdateMisionComponent),
      }, */
      {
        path: 'carousel',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/carousel/carousel.component').then(
            (m) => m.CarouselComponent
          ),
      },
      {
        path: 'carousel/update/file',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/carousel/update-file-carousel/update-file-carousel.component'
          ).then((m) => m.UpdateFileCarouselComponent),
      },
      /* {
        path: 'servicio1',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/producto/producto.component').then(
            (m) => m.ProductoComponent
          ),
      },
      {
        path: 'servicio1/create',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/producto/create/create.component').then(
            (m) => m.CreateComponent
          ),
      },
      {
        path: 'servicio1/edit',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/producto/edit/edit.component').then(
            (m) => m.EditComponent
          ),
      },
      {
        path: 'servicio2',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/especialidad/especialidad.component').then(
            (m) => m.EspecialidadComponent
          ),
      },
      {
        path: 'servicio2/create',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/especialidad/create-especialidad/create-especialidad.component'
          ).then((m) => m.CreateEspecialidadComponent),
      },
      {
        path: 'servicio2/edit',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/especialidad/edit-especialidad/edit-especialidad.component'
          ).then((m) => m.EditEspecialidadComponent),
      }, */
      {
        path: 'contactos',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/contacto/contacto.component').then(
            (m) => m.ContactoComponent
          ),
      },
      /*  {
        path: 'testimonios',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/admin/testimonio/testimonio.component').then(
            (m) => m.TestimonioComponent
          ),
      },
      {
        path: 'testimonios/create',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/testimonio/create-testimonio/create-testimonio.component'
          ).then((m) => m.CreateTestimonioComponent),
      },
      {
        path: 'testimonios/edit',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import(
            './pages/admin/testimonio/edit-testimonio/edit-testimonio.component'
          ).then((m) => m.EditTestimonioComponent),
      },
      {
        path: 'blog/posts',

        loadComponent: () =>
          import(
            './pages/admin/blog/post/posts-list/posts-list.component'
          ).then((m) => m.PostsListComponent),
      },
      {
        path: 'blog/posts/create',

        loadComponent: () =>
          import(
            './pages/admin/blog/post/create-post/create-post.component'
          ).then((m) => m.CreatePostComponent),
      },
      {
        path: 'blog/posts/edit/:id',

        loadComponent: () =>
          import('./pages/admin/blog/post/edit-post/edit-post.component').then(
            (m) => m.EditPostComponent
          ),
      },
      {
        path: 'blog/users',

        loadComponent: () =>
          import(
            './pages/admin/blog/user/users-list/users-list.component'
          ).then((m) => m.UsersListComponent),
      },
      {
        path: 'blog/comments',

        loadComponent: () =>
          import(
            './pages/admin/blog/comments/comments-list/comments-list.component'
          ).then((m) => m.CommentsListComponent),
      },
      {
        path: 'blog/comments/create',

        loadComponent: () =>
          import(
            './pages/admin/blog/comments/create-comment/create-comment.component'
          ).then((m) => m.CreateCommentComponent),
      },
      {
        path: 'blog/comments/edit/:id',

        loadComponent: () =>
          import(
            './pages/admin/blog/comments/edit-comment/edit-comment.component'
          ).then((m) => m.EditCommentComponent),
      },
      {
        path: 'blog/tags',

        loadComponent: () =>
          import('./pages/admin/blog/tag/tags-list/tags-list.component').then(
            (m) => m.TagsListComponent
          ),
      },
      {
        path: 'blog/tags/create',

        loadComponent: () =>
          import('./pages/admin/blog/tag/create-tag/create-tag.component').then(
            (m) => m.CreateTagComponent
          ),
      },
      {
        path: 'blog/tags/edit/:id',

        loadComponent: () =>
          import('./pages/admin/blog/tag/edit-tag/edit-tag.component').then(
            (m) => m.EditTagComponent
          ),
      },
      {
        path: 'blog/categories',

        loadComponent: () =>
          import(
            './pages/admin/blog/categories/categories-list/categories-list.component'
          ).then((m) => m.CategoriesListComponent),
      },
      {
        path: 'blog/categories/create',

        loadComponent: () =>
          import(
            './pages/admin/blog/categories/create-category/create-category.component'
          ).then((m) => m.CreateCategoryComponent),
      },
      {
        path: 'blog/categories/edit/:id',

        loadComponent: () =>
          import(
            './pages/admin/blog/categories/edit-category/edit-category.component'
          ).then((m) => m.EditCategoryComponent),
      }, */
      {
        path: 'clientes',
        canActivate: [AuthGuard],
        //component: ClientesComponent,
        loadComponent: () =>
          import('./pages/admin/clientes/clientes.component').then(
            (m) => m.ClientesComponent
          ),
      },
      {
        path: 'tipos-motos',
        canActivate: [AuthGuard],
        //component: TipoMotoComponent,
        loadComponent: () =>
          import('./pages/admin/tipo-moto/tipo-moto.component').then(
            (m) => m.TipoMotoComponent
          ),
      },
      {
        path: 'motos',
        canActivate: [AuthGuard],
        //component: MotoComponent,
        loadComponent: () =>
          import('./pages/admin/moto/moto.component').then(
            (m) => m.MotoComponent
          ),
      },
      {
        path: 'motos/create',
        canActivate: [AuthGuard],
        //component: CreateMotoComponent,
        loadComponent: () =>
          import('./pages/admin/moto/create-moto/create-moto.component').then(
            (m) => m.CreateMotoComponent
          ),
      },
      {
        path: 'motos/edit/:id',
        canActivate: [AuthGuard],
        //component: EditMotoComponent,
        loadComponent: () =>
          import('./pages/admin/moto/edit-moto/edit-moto.component').then(
            (m) => m.EditMotoComponent
          ),
      },
      {
        path: 'modelos',
        canActivate: [AuthGuard],
        //component: ModeloMotoComponent,
        loadComponent: () =>
          import('./pages/admin/modelo-moto/modelo-moto.component').then(
            (m) => m.ModeloMotoComponent
          ),
      },
      {
        path: 'marcas',
        canActivate: [AuthGuard],
        //component: MarcaComponent,
        loadComponent: () =>
          import('./pages/admin/marca/marca.component').then(
            (m) => m.MarcaComponent
          ),
      },
      {
        path: 'tipos-accesorios',
        canActivate: [AuthGuard],
        //component: TipoAccesorioComponent,
        loadComponent: () =>
          import('./pages/admin/tipo-accesorio/tipo-accesorio.component').then(
            (m) => m.TipoAccesorioComponent
          ),
      },
      {
        path: 'tipos-repuestos',
        canActivate: [AuthGuard],
        //component: TipoRepuestoComponent,
        loadComponent: () =>
          import('./pages/admin/tipo-repuesto/tipo-repuesto.component').then(
            (m) => m.TipoRepuestoComponent
          ),
      },
      {
        path: 'accesorios',
        canActivate: [AuthGuard],
        //component: AccesorioComponent,
        loadComponent: () =>
          import('./pages/admin/accesorio/accesorio.component').then(
            (m) => m.AccesorioComponent
          ),
      },
      {
        path: 'accesorios/create',
        canActivate: [AuthGuard],
        //component: CreateAccesorioComponent,
        loadComponent: () =>
          import(
            './pages/admin/accesorio/create-accesorio/create-accesorio.component'
          ).then((m) => m.CreateAccesorioComponent),
      },
      {
        path: 'accesorios/edit/:id',
        canActivate: [AuthGuard],
        //component: EditAccesorioComponent,
        loadComponent: () =>
          import(
            './pages/admin/accesorio/edit-accesorio/edit-accesorio.component'
          ).then((m) => m.EditAccesorioComponent),
      },
      {
        path: 'repuestos',
        canActivate: [AuthGuard],
        //component: RepuestoComponent,
        loadComponent: () =>
          import('./pages/admin/repuesto/repuesto.component').then(
            (m) => m.RepuestoComponent
          ),
      },
      {
        path: 'repuestos/create',
        canActivate: [AuthGuard],
        //component: CreateRepuestoComponent,
        loadComponent: () =>
          import(
            './pages/admin/repuesto/create-repuesto/create-repuesto.component'
          ).then((m) => m.CreateRepuestoComponent),
      },
      {
        path: 'repuestos/edit/:id',
        canActivate: [AuthGuard],
        //component: EditRepuestoComponent,
        loadComponent: () =>
          import(
            './pages/admin/repuesto/edit-repuesto/edit-repuesto.component'
          ).then((m) => m.EditRepuestoComponent),
      },
      {
        path: 'cotizaciones',
        canActivate: [AuthGuard],
        //component: CotizacionComponent,
        loadComponent: () =>
          import('./pages/admin/cotizacion/cotizacion.component').then(
            (m) => m.CotizacionComponent
          ),
      },
      {
        path: 'financiaciones',
        canActivate: [AuthGuard],
        //component: FinanciacionComponent,
        loadComponent: () =>
          import('./pages/admin/financiacion/financiacion.component').then(
            (m) => m.FinanciacionComponent
          ),
      },
      {
        path: 'categoria-medios',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './pages/admin/categoria-medios/categoria-medios.component'
          ).then((m) => m.CategoriaMediosComponent),
      },
      {
        path: 'medios-archivos',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/admin/medios-files/medios-files.component').then(
            (m) => m.MediosFilesComponent
          ),
      },
      {
        path: 'categoria/equipo',
        //component: ListCategoria1Component,
        loadComponent: () =>
          import(
            './pages/admin/componente1/categoria1/list-categoria1/list-categoria1.component'
          ).then((m) => m.ListCategoria1Component),
      },

      {
        path: 'categoria/equipo/create',
        //component: CreateCategoria1Component,
        loadComponent: () =>
          import(
            './pages/admin/componente1/categoria1/create-categoria1/create-categoria1.component'
          ).then((m) => m.CreateCategoria1Component),
      },

      {
        path: 'categoria/equipo/edit/:id',
        //component: EditCategoria1Component,
        loadComponent: () =>
          import(
            './pages/admin/componente1/categoria1/edit-categoria1/edit-categoria1.component'
          ).then((m) => m.EditCategoria1Component),
      },
      { path: 'equipo', component: ListTabla1Component },

      {
        path: 'equipo/create',
        //component: CreateTabla1Component,
        loadComponent: () =>
          import(
            './pages/admin/componente1/tabla1/create-tabla1/create-tabla1.component'
          ).then((m) => m.CreateTabla1Component),
      },

      {
        path: 'equipo/edit/:id',
        //component: EditTabla1Component,
        loadComponent: () =>
          import(
            './pages/admin/componente1/tabla1/edit-tabla1/edit-tabla1.component'
          ).then((m) => m.EditTabla1Component),
      },
    ],
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'layout-uno',
        //component: LayoutUnoComponent,
        loadComponent: () =>
          import('./layout/layout-uno/layout-uno.component').then(
            (m) => m.LayoutUnoComponent
          ),
      },
      {
        path: 'layout-dos',
        //component: LayoutDosComponent,
        loadComponent: () =>
          import('./layout/layout-dos/layout-dos.component').then(
            (m) => m.LayoutDosComponent
          ),
      },
      {
        path: 'layout-tres',
        //component: LayoutTresComponent,
        loadComponent: () =>
          import('./layout/layout-tres/layout-tres.component').then(
            (m) => m.LayoutTresComponent
          ),
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
