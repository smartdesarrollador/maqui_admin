/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { EventBindingComponent } from './event-binding/event-binding.component';
import { ClassBindingComponent } from './class-binding/class-binding.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PropertyBindingComponent } from './property-binding/property-binding.component';
import { NgifComponent } from './ngif/ngif.component';
import { ChildrenComponent } from './children/children.component';
import { HomeComponent } from './rutas/home/home.component';
import { PageNotFoundComponent } from './rutas/page-not-found/page-not-found.component';
import { UserDetailsComponent } from './rutas/user-details/user-details.component';
import { Formulario2Component } from './formulario2/formulario2.component';
import { AddCategoryComponent } from './crud/add-category/add-category.component';
import { ListCategoryComponent } from './crud/list-category/list-category.component';
import { PdfComponent } from './pdf/pdf.component';
import { FormularioValidacionesComponent } from './formulario-validaciones/formulario-validaciones.component';
import { UploadComponent } from './upload/upload.component';
import { Pagina1Component } from './localstorage/pagina1/pagina1.component';
import { Pagina2Component } from './localstorage/pagina2/pagina2.component';
import { ToastrComponent } from './toastr/toastr.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
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
    path: 'rutas/user-details/:id',
    component: UserDetailsComponent,
  },
  {
    path: 'rutas/page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: 'formulario2',
    component: Formulario2Component,
  },
  {
    path: 'crud/add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'crud/list-category',
    component: ListCategoryComponent,
  },
  {
    path: 'pdf',
    component: PdfComponent,
  },
  {
    path: 'formulario-validaciones',
    component: FormularioValidacionesComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'localstorage/pagina1',
    component: Pagina1Component,
  },
  {
    path: 'localstorage/pagina2',
    component: Pagina2Component,
  },
  {
    path: 'toastr',
    component: ToastrComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularRoutingModule {} */
