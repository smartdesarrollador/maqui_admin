import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-septimo-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './septimo-proceso.component.html',
  styleUrls: ['./septimo-proceso.component.css'],
})
export class SeptimoProcesoComponent {
  selectedValue: string = '';
  datosLocales: any = {};
  @ViewChild('form1', { static: true }) form1: any;

  fechaActual = new Date();
  remuneracion: string = '';
  duracion_contrato: number = 1;
  fecha_periodo: string = '';
  url_atras: string = '';

  //declarar dia mes y año de fechaActual
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1;
  anio = this.fechaActual.getFullYear();

  //declarar variable para almacenar la fecha actual con el formato dd/MM/yyyy
  fechaActualFormato: string = this.dia + '/' + this.mes + '/' + this.anio;
  fechaRenovacion: string = '';
  fecha_inicio: Date = this.fechaActual;
  fechaInicioFormateado: string;

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {
    this.fechaInicioFormateado = this.convertirFechaInicio(this.fecha_inicio);
  }

  ngOnInit() {
    this.asignarFechaRemuneracion();

    const contratoLocal = this.cl.getItem('contratoLocal');
    this.datosLocales = contratoLocal;

    this.urls_atras(this.datosLocales.modelo_contrato);
  }

  urls_atras(modelo_contrato: string): void {
    switch (this.datosLocales.modelo_contrato) {
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INICIO DE ACTIVIDAD':
        this.url_atras = '/admin/contratacion/contrato/proceso_6';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INCREMENTO DE ACTIVIDAD':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR NECESIDAD DE MERCADO':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR RECONVERSION EMPRESARIAL':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE OCASIONAL':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE SUPLENCIA':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_c';
        break;
      case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE EMERGENCIA':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR OBRA DETERMINADA':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_d';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR SERVICIO ESPECÍFICO':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_e';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD INTERMITENTE':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD DE CONTRATO DE TEMPORADA':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_f';
        break;
      case 'CONTRATO DE TRABAJO INNOMINADO A PLAZO FIJO':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN FISCALIZACION':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      case 'MODELO DE CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN CONFIANZA Y CON FISCALIZACION':
        this.url_atras = '/admin/contratacion/contrato/proceso_6_b';
        break;
      default:
    }
  }

  procesarFecha(): void {
    let fechaFormateada: string;

    if (this.fecha_periodo === 'Año') {
      fechaFormateada = this.formatearFecha(
        this.sumarAnios(this.duracion_contrato)
      );
    } else if (this.fecha_periodo === 'Mes') {
      fechaFormateada = this.formatearFecha(
        this.sumarMeses(this.duracion_contrato)
      );
    } else {
      fechaFormateada = this.formatearFecha(
        this.sumarDias(this.duracion_contrato)
      );
    }

    this.fechaRenovacion = fechaFormateada;
  }

  sumarDias(dias: number) {
    const fecha = new Date(this.fecha_inicio);
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  sumarMeses(meses: number) {
    const fecha = new Date(this.fecha_inicio);
    fecha.setMonth(fecha.getMonth() + meses);
    return fecha;
  }

  sumarAnios(anios: number) {
    const fecha = new Date(this.fecha_inicio);
    fecha.setFullYear(fecha.getFullYear() + anios);
    return fecha;
  }

  formatearFecha(fecha: Date): string {
    const dia = fecha.getDate() + 1;
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  convertirFechaInicio(fecha: any): string {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; // Se suma 1 porque los meses comienzan desde 0
    const anio = fechaObj.getFullYear();

    // Formatea los componentes de la fecha para obtener 'dd/MM/yyyy'
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes
      .toString()
      .padStart(2, '0')}/${anio}`;

    return fechaFormateada;
  }

  asignarFechaRemuneracion(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (this.datosLocales.fecha_inicio) {
        this.fechaActualFormato = this.datosLocales.fecha_inicio;
        this.fechaRenovacion = this.datosLocales.fecha_renovacion;
        this.remuneracion = this.datosLocales.remuneracion;
        this.fecha_periodo = this.datosLocales.duracion_contrato;
      } else {
        this.fechaActualFormato = this.fechaInicioFormateado;
        this.fechaRenovacion = '';
        this.remuneracion = '';
        this.fecha_periodo = '';
      }
    }
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.fecha_inicio = this.fechaInicioFormateado;
      contratoLocaldatos.fecha_renovacion = this.fechaRenovacion;
      contratoLocaldatos.remuneracion = this.remuneracion;
      contratoLocaldatos.duracion_contrato =
        this.duracion_contrato + ' ' + this.fecha_periodo;

      this.cl.setItem('contratoLocal', contratoLocaldatos);

      this.router.navigate(['admin/contratacion/contrato/proceso_8']);
    } else {
      this.alerta();
    }
  }

  alerta() {
    Swal.fire({
      icon: 'error',
      title: 'Campos requeridos',
    });
  }
}
