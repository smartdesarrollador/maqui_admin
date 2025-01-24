import { Component } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-undecimo-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './undecimo-proceso.component.html',
  styleUrls: ['./undecimo-proceso.component.css'],
})
export class UndecimoProcesoComponent {
  obligaciones_compromisos: boolean = false;
  confidencialidad: boolean = false;
  propiedad_intelectual: boolean = false;
  tecnologia_informacion: boolean = false;
  exclusividad: boolean = false;
  proteccion_datos: boolean = false;
  datosLocales: any = {};

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit() {
    this.asignarClausulasOpcionales();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  asignarClausulasOpcionales(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (
        this.datosLocales.obligaciones_compromisos == true ||
        this.datosLocales.obligaciones_compromisos == false
      ) {
        this.obligaciones_compromisos =
          this.datosLocales.obligaciones_compromisos;
        this.confidencialidad = this.datosLocales.confidencialidad;
        this.propiedad_intelectual = this.datosLocales.propiedad_intelectual;
        this.tecnologia_informacion = this.datosLocales.tecnologia_informacion;
        this.exclusividad = this.datosLocales.exclusividad;
        this.proteccion_datos = this.datosLocales.proteccion_datos;
      } else {
        this.obligaciones_compromisos = false;
        this.confidencialidad = false;
        this.propiedad_intelectual = false;
        this.tecnologia_informacion = false;
        this.exclusividad = false;
        this.proteccion_datos = false;
      }
    }
  }

  saveToLocalStorage() {
    const contratoLocaldatos = this.cl.getItem('contratoLocal');
    contratoLocaldatos.obligaciones_compromisos = this.obligaciones_compromisos;
    contratoLocaldatos.confidencialidad = this.confidencialidad;
    contratoLocaldatos.propiedad_intelectual = this.propiedad_intelectual;
    contratoLocaldatos.tecnologia_informacion = this.tecnologia_informacion;
    contratoLocaldatos.exclusividad = this.exclusividad;
    contratoLocaldatos.proteccion_datos = this.proteccion_datos;

    this.cl.setItem('contratoLocal', contratoLocaldatos);

    this.router.navigate(['admin/contratacion/contrato/proceso_12']);
  }
}
