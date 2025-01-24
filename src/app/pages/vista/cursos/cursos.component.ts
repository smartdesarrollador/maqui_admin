import { Component } from '@angular/core';
import { CardCursoComponent } from 'src/app/layout/componentes/card-curso/card-curso.component';
import { CardEspecialidadComponent } from 'src/app/layout/componentes/card-especialidad/card-especialidad.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CardCursoComponent, CardEspecialidadComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
})
export class CursosComponent {}
