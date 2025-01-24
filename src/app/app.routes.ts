import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { VistaComponent } from './pages/vista/vista.component';
import { InicioComponent } from './pages/vista/inicio/inicio.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CursosComponent } from './pages/vista/cursos/cursos.component';

import { AdminGuard } from './guards/admin.guard';
import { EmpleadorGuard } from './guards/empleador.guard';
import { TrabajadorGuard } from './guards/trabajador';
import { AuthGuard } from './guards/auth.guard';

/* ---------------------------------------------------------------------- */

import { PortalComponent } from './paginas/login/portal/portal.component';
import { LayoutUnoComponent } from './layout/layout-uno/layout-uno.component';
import { LayoutDosComponent } from './layout/layout-dos/layout-dos.component';
import { LayoutComponent } from './layout/layout.component';
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
import { EditCommentComponent } from './pages/admin/blog/comments/edit-comment/edit-comment.component';
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
        component: BannersComponent,
      },
      {
        path: 'update/file',
        canActivate: [AuthGuard],
        component: UpdateFileComponent,
      },
      {
        path: 'mision',
        canActivate: [AuthGuard],
        component: MisionComponent,
      },
      {
        path: 'mision/update/file',
        canActivate: [AuthGuard],
        component: UpdateFileMisionComponent,
      },
      {
        path: 'mision/update',
        canActivate: [AuthGuard],
        component: UpdateMisionComponent,
      },
      {
        path: 'carousel',
        canActivate: [AuthGuard],
        component: CarouselComponent,
      },
      {
        path: 'carousel/update/file',
        canActivate: [AuthGuard],
        component: UpdateFileCarouselComponent,
      },
      {
        path: 'servicio1',
        canActivate: [AuthGuard],
        component: ProductoComponent,
      },
      {
        path: 'servicio1/create',
        canActivate: [AuthGuard],
        component: CreateComponent,
      },
      {
        path: 'servicio1/edit',
        canActivate: [AuthGuard],
        component: EditComponent,
      },
      {
        path: 'servicio2',
        canActivate: [AuthGuard],
        component: EspecialidadComponent,
      },
      {
        path: 'servicio2/create',
        canActivate: [AuthGuard],
        component: CreateEspecialidadComponent,
      },
      {
        path: 'servicio2/edit',
        canActivate: [AuthGuard],
        component: EditEspecialidadComponent,
      },
      {
        path: 'contactos',
        canActivate: [AuthGuard],
        component: ContactoComponent,
      },
      {
        path: 'testimonios',
        canActivate: [AuthGuard],
        component: TestimonioComponent,
      },
      {
        path: 'testimonios/create',
        canActivate: [AuthGuard],
        component: CreateTestimonioComponent,
      },
      {
        path: 'testimonios/edit',
        canActivate: [AuthGuard],
        component: EditTestimonioComponent,
      },
      {
        path: 'blog/posts',
        component: PostsListComponent,
      },
      {
        path: 'blog/posts/create',
        component: CreatePostComponent,
      },
      {
        path: 'blog/posts/edit/:id',
        component: EditPostComponent,
      },
      {
        path: 'blog/users',
        component: UsersListComponent,
      },
      {
        path: 'blog/comments',
        component: CommentsListComponent,
      },
      {
        path: 'blog/comments/create',
        component: CreateCommentComponent,
      },
      {
        path: 'blog/comments/edit/:id',
        component: EditCommentComponent,
      },
      {
        path: 'blog/tags',
        component: TagsListComponent,
      },
      {
        path: 'blog/tags/create',
        component: CreateTagComponent,
      },
      {
        path: 'blog/tags/edit/:id',
        component: EditTagComponent,
      },
      {
        path: 'blog/categories',
        component: CategoriesListComponent,
      },
      {
        path: 'blog/categories/create',
        component: CreateCategoryComponent,
      },
      {
        path: 'blog/categories/edit/:id',
        component: EditCategoryComponent,
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
