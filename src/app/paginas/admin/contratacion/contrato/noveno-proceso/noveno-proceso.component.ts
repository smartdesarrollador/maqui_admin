import { Component } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-noveno-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './noveno-proceso.component.html',
  styleUrls: ['./noveno-proceso.component.css'],
})
export class NovenoProcesoComponent {
  fiscalizacion_inmediata: boolean = false;
  jornada_maxima: boolean = false;
  datosLocales: any = {};

  dia_inicio: string = '';
  dia_final: string = '';
  horario_inicio: string = '';
  horario_final: string = '';

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit() {
    this.asignarCalificacionEspecialF();
  }

  asignarCalificacionEspecialF(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (
        this.datosLocales.fiscalizacion_inmediata == true ||
        this.datosLocales.fiscalizacion_inmediata == false
      ) {
        this.fiscalizacion_inmediata =
          this.datosLocales.fiscalizacion_inmediata;
        this.jornada_maxima = this.datosLocales.jornada_maxima;
      } else {
        if (this.datosLocales.trabajador_direccion == true) {
          this.fiscalizacion_inmediata = true;
          this.jornada_maxima = false;
        } else {
          this.fiscalizacion_inmediata = false;
          this.jornada_maxima = false;
        }
      }
    }
  }

  onCheckboxChange(checkboxName: string) {
    if (checkboxName === 'fiscalizacion_inmediata') {
      this.jornada_maxima = false; // Deseleccionar "¿El trabajador es de Dirección?"
    } else if (checkboxName === 'jornada_maxima') {
      this.fiscalizacion_inmediata = false; // Deseleccionar "¿El trabajador es de Confianza?"
    }
  }

  saveToLocalStorage() {
    const contratoLocaldatos = this.cl.getItem('contratoLocal');
    contratoLocaldatos.fiscalizacion_inmediata = this.fiscalizacion_inmediata;
    contratoLocaldatos.jornada_maxima = this.jornada_maxima;
    contratoLocaldatos.dia_inicio = this.dia_inicio;
    contratoLocaldatos.dia_final = this.dia_final;
    contratoLocaldatos.horario_inicio = this.horario_inicio;
    contratoLocaldatos.horario_final = this.horario_final;

    this.cl.setItem('contratoLocal', contratoLocaldatos);

    this.router.navigate(['admin/contratacion/contrato/proceso_10']);
  }
}
