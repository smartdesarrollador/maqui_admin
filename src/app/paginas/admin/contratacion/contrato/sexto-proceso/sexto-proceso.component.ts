import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sexto-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './sexto-proceso.component.html',
  styleUrls: ['./sexto-proceso.component.css'],
})
export class SextoProcesoComponent implements OnInit {
  selectedValue: string = '';
  datosLocales: any = {};
  Swal = require('sweetalert2');
  @ViewChild('form1', { static: true }) form1: any;

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit(): void {
    this.asignarOfertaLaboral();
  }

  asignarOfertaLaboral(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (this.datosLocales.oferta_laboral) {
        this.selectedValue = this.datosLocales.oferta_laboral;
      } else {
        this.selectedValue = '';
      }
    }
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.oferta_laboral = this.selectedValue;

      this.cl.setItem('contratoLocal', contratoLocaldatos);

      switch (this.datosLocales.modelo_contrato) {
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INICIO DE ACTIVIDAD':
          this.router.navigate(['admin/contratacion/contrato/proceso_7']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INCREMENTO DE ACTIVIDAD':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR NECESIDAD DE MERCADO':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR RECONVERSION EMPRESARIAL':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE OCASIONAL':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE SUPLENCIA':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_c']);
          break;
        case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE EMERGENCIA':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR OBRA DETERMINADA':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_d']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR SERVICIO ESPECÍFICO':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_e']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD INTERMITENTE':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD DE CONTRATO DE TEMPORADA':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_f']);
          break;
        case 'CONTRATO DE TRABAJO INNOMINADO A PLAZO FIJO':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN FISCALIZACION':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        case 'MODELO DE CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN CONFIANZA Y CON FISCALIZACION':
          this.router.navigate(['admin/contratacion/contrato/proceso_6_b']);
          break;
        default:
      }
    } else {
      this.alerta();
    }
  }

  alerta() {
    Swal.fire({
      icon: 'error',
      title: 'Campo requerido',
    });
  }
}
