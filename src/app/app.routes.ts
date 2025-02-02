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
/* import { LayoutUnoComponent } from './layout/layout-uno/layout-uno.component';
import { LayoutDosComponent } from './layout/layout-dos/layout-dos.component';
import { LayoutTresComponent } from './layout/layout-tres/layout-tres.component';
import { BannersComponent } from './pages/admin/banners/banners.component';
import { UpdateFileComponent } from './pages/admin/banners/update-file/update-file.component';
import { MisionComponent } from './pages/admin/mision/mision.component';
import { UpdateFileMisionComponent } from './pages/admin/mision/update-file-mision/update-file-mision.component';
import { UpdateMisionComponent } from './pages/admin/mision/update-mision/update-mision.component';
import { CarouselComponent } from './pages/admin/carousel/carousel.component';
import { UpdateFileCarouselComponent } from './pages/admin/carousel/update-file-carousel/update-file-carousel.component';
import { VerCursoComponent } from './layout/componentes/ver-curso/ver-curso.component';
import { ProductoComponent } from './pages/admin/producto/producto.component';
import { CreateComponent } from './pages/admin/producto/create/create.component';
import { EditComponent } from './pages/admin/producto/edit/edit.component';
import { EspecialidadComponent } from './pages/admin/especialidad/especialidad.component';
import { CreateEspecialidadComponent } from './pages/admin/especialidad/create-especialidad/create-especialidad.component';
import { EditEspecialidadComponent } from './pages/admin/especialidad/edit-especialidad/edit-especialidad.component';
import { ContactoComponent } from './pages/admin/contacto/contacto.component';
import { TestimonioComponent } from './pages/admin/testimonio/testimonio.component';
import { CreateTestimonioComponent } from './pages/admin/testimonio/create-testimonio/create-testimonio.component';
import { EditTestimonioComponent } from './pages/admin/testimonio/edit-testimonio/edit-testimonio.component';
import { PostsListComponent } from './pages/admin/blog/post/posts-list/posts-list.component';
import { UsersListComponent } from './pages/admin/blog/user/users-list/users-list.component';
import { CommentsListComponent } from './pages/admin/blog/comments/comments-list/comments-list.component';
import { TagsListComponent } from './pages/admin/blog/tag/tags-list/tags-list.component';
import { CategoriesListComponent } from './pages/admin/blog/categories/categories-list/categories-list.component';
import { CreatePostComponent } from './pages/admin/blog/post/create-post/create-post.component';
import { CreateCategoryComponent } from './pages/admin/blog/categories/create-category/create-category.component';
import { CreateTagComponent } from './pages/admin/blog/tag/create-tag/create-tag.component';
import { CreateCommentComponent } from './pages/admin/blog/comments/create-comment/create-comment.component';
import { EditCategoryComponent } from './pages/admin/blog/categories/edit-category/edit-category.component';
import { EditTagComponent } from './pages/admin/blog/tag/edit-tag/edit-tag.component';
import { EditPostComponent } from './pages/admin/blog/post/edit-post/edit-post.component';
import { EditCommentComponent } from './pages/admin/blog/comments/edit-comment/edit-comment.component'; */
import { ListCategoria1Component } from './pages/admin/componente1/categoria1/list-categoria1/list-categoria1.component';
import { CreateCategoria1Component } from './pages/admin/componente1/categoria1/create-categoria1/create-categoria1.component';
import { EditCategoria1Component } from './pages/admin/componente1/categoria1/edit-categoria1/edit-categoria1.component';
import { ListTabla1Component } from './pages/admin/componente1/tabla1/list-tabla1/list-tabla1.component';
import { CreateTabla1Component } from './pages/admin/componente1/tabla1/create-tabla1/create-tabla1.component';
import { EditTabla1Component } from './pages/admin/componente1/tabla1/edit-tabla1/edit-tabla1.component';

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
        //component: BannersComponent,
        loadComponent: () =>
          import('./pages/admin/banners/banners.component').then(
            (m) => m.BannersComponent
          ),
      },
      {
        path: 'update/file',
        canActivate: [AuthGuard],
        //component: UpdateFileComponent,
        loadComponent: () =>
          import(
            './pages/admin/banners/update-file/update-file.component'
          ).then((m) => m.UpdateFileComponent),
      },
      {
        path: 'mision',
        canActivate: [AuthGuard],
        //component: MisionComponent,
        loadComponent: () =>
          import('./pages/admin/mision/mision.component').then(
            (m) => m.MisionComponent
          ),
      },
      {
        path: 'mision/update/file',
        canActivate: [AuthGuard],
        //component: UpdateFileMisionComponent,
        loadComponent: () =>
          import(
            './pages/admin/mision/update-file-mision/update-file-mision.component'
          ).then((m) => m.UpdateFileMisionComponent),
      },
      {
        path: 'mision/update',
        canActivate: [AuthGuard],
        //component: UpdateMisionComponent,
        loadComponent: () =>
          import(
            './pages/admin/mision/update-mision/update-mision.component'
          ).then((m) => m.UpdateMisionComponent),
      },
      {
        path: 'carousel',
        canActivate: [AuthGuard],
        //component: CarouselComponent,
        loadComponent: () =>
          import('./pages/admin/carousel/carousel.component').then(
            (m) => m.CarouselComponent
          ),
      },
      {
        path: 'carousel/update/file',
        canActivate: [AuthGuard],
        //component: UpdateFileCarouselComponent,
        loadComponent: () =>
          import(
            './pages/admin/carousel/update-file-carousel/update-file-carousel.component'
          ).then((m) => m.UpdateFileCarouselComponent),
      },
      {
        path: 'servicio1',
        canActivate: [AuthGuard],
        //component: ProductoComponent,
        loadComponent: () =>
          import('./pages/admin/producto/producto.component').then(
            (m) => m.ProductoComponent
          ),
      },
      {
        path: 'servicio1/create',
        canActivate: [AuthGuard],
        //component: CreateComponent,
        loadComponent: () =>
          import('./pages/admin/producto/create/create.component').then(
            (m) => m.CreateComponent
          ),
      },
      {
        path: 'servicio1/edit',
        canActivate: [AuthGuard],
        //component: EditComponent,
        loadComponent: () =>
          import('./pages/admin/producto/edit/edit.component').then(
            (m) => m.EditComponent
          ),
      },
      {
        path: 'servicio2',
        canActivate: [AuthGuard],
        //component: EspecialidadComponent,
        loadComponent: () =>
          import('./pages/admin/especialidad/especialidad.component').then(
            (m) => m.EspecialidadComponent
          ),
      },
      {
        path: 'servicio2/create',
        canActivate: [AuthGuard],
        //component: CreateEspecialidadComponent,
        loadComponent: () =>
          import(
            './pages/admin/especialidad/create-especialidad/create-especialidad.component'
          ).then((m) => m.CreateEspecialidadComponent),
      },
      {
        path: 'servicio2/edit',
        canActivate: [AuthGuard],
        //component: EditEspecialidadComponent,
        loadComponent: () =>
          import(
            './pages/admin/especialidad/edit-especialidad/edit-especialidad.component'
          ).then((m) => m.EditEspecialidadComponent),
      },
      {
        path: 'contactos',
        canActivate: [AuthGuard],
        //component: ContactoComponent,
        loadComponent: () =>
          import('./pages/admin/contacto/contacto.component').then(
            (m) => m.ContactoComponent
          ),
      },
      {
        path: 'testimonios',
        canActivate: [AuthGuard],
        //component: TestimonioComponent,
        loadComponent: () =>
          import('./pages/admin/testimonio/testimonio.component').then(
            (m) => m.TestimonioComponent
          ),
      },
      {
        path: 'testimonios/create',
        canActivate: [AuthGuard],
        //component: CreateTestimonioComponent,
        loadComponent: () =>
          import(
            './pages/admin/testimonio/create-testimonio/create-testimonio.component'
          ).then((m) => m.CreateTestimonioComponent),
      },
      {
        path: 'testimonios/edit',
        canActivate: [AuthGuard],
        //component: EditTestimonioComponent,
        loadComponent: () =>
          import(
            './pages/admin/testimonio/edit-testimonio/edit-testimonio.component'
          ).then((m) => m.EditTestimonioComponent),
      },
      {
        path: 'blog/posts',
        //component: PostsListComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/post/posts-list/posts-list.component'
          ).then((m) => m.PostsListComponent),
      },
      {
        path: 'blog/posts/create',
        //component: CreatePostComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/post/create-post/create-post.component'
          ).then((m) => m.CreatePostComponent),
      },
      {
        path: 'blog/posts/edit/:id',
        //component: EditPostComponent,
        loadComponent: () =>
          import('./pages/admin/blog/post/edit-post/edit-post.component').then(
            (m) => m.EditPostComponent
          ),
      },
      {
        path: 'blog/users',
        //component: UsersListComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/user/users-list/users-list.component'
          ).then((m) => m.UsersListComponent),
      },
      {
        path: 'blog/comments',
        //component: CommentsListComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/comments/comments-list/comments-list.component'
          ).then((m) => m.CommentsListComponent),
      },
      {
        path: 'blog/comments/create',
        //component: CreateCommentComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/comments/create-comment/create-comment.component'
          ).then((m) => m.CreateCommentComponent),
      },
      {
        path: 'blog/comments/edit/:id',
        //component: EditCommentComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/comments/edit-comment/edit-comment.component'
          ).then((m) => m.EditCommentComponent),
      },
      {
        path: 'blog/tags',
        //component: TagsListComponent,
        loadComponent: () =>
          import('./pages/admin/blog/tag/tags-list/tags-list.component').then(
            (m) => m.TagsListComponent
          ),
      },
      {
        path: 'blog/tags/create',
        //component: CreateTagComponent,
        loadComponent: () =>
          import('./pages/admin/blog/tag/create-tag/create-tag.component').then(
            (m) => m.CreateTagComponent
          ),
      },
      {
        path: 'blog/tags/edit/:id',
        //component: EditTagComponent,
        loadComponent: () =>
          import('./pages/admin/blog/tag/edit-tag/edit-tag.component').then(
            (m) => m.EditTagComponent
          ),
      },
      {
        path: 'blog/categories',
        //component: CategoriesListComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/categories/categories-list/categories-list.component'
          ).then((m) => m.CategoriesListComponent),
      },
      {
        path: 'blog/categories/create',
        //component: CreateCategoryComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/categories/create-category/create-category.component'
          ).then((m) => m.CreateCategoryComponent),
      },
      {
        path: 'blog/categories/edit/:id',
        //component: EditCategoryComponent,
        loadComponent: () =>
          import(
            './pages/admin/blog/categories/edit-category/edit-category.component'
          ).then((m) => m.EditCategoryComponent),
      },
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
        path: 'modelos',
        canActivate: [AuthGuard],
        //component: ModeloMotoComponent,
        loadComponent: () =>
          import('./pages/admin/modelo-moto/modelo-moto.component').then(
            (m) => m.ModeloMotoComponent
          ),
      },
      { path: 'categoria/equipo', component: ListCategoria1Component },
      { path: 'categoria/equipo/create', component: CreateCategoria1Component },
      { path: 'categoria/equipo/edit/:id', component: EditCategoria1Component },
      { path: 'equipo', component: ListTabla1Component },

      { path: 'equipo/create', component: CreateTabla1Component },
      { path: 'equipo/edit/:id', component: EditTabla1Component },
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
