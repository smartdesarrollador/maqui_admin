import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { Empleador } from 'src/app/interface/empleador';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { EmpleadorService } from 'src/app/services/empleador.service';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import { DatePipe } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { forkJoin } from 'rxjs';

import { contratoInicioActividad } from './funciones-contratos/contrato-inicio-actividad';
import { contratoIncrementoActividad } from './funciones-contratos/contrato-incremento-actividad';
import { contratoDeEmergencia } from './funciones-contratos/contrato-de-emergencia';
import { contratoIndeterminadoConFiscalizacion } from './funciones-contratos/contrato-indeterminado-con-fiscalizacion';
import { contratoIndeterminadoSinFiscalizacion } from './funciones-contratos/contrato-indeterminado-sin-fiscalizacion';
import { contratoIndeterminado } from './funciones-contratos/contrato-indeterminado';
import { contratoInnominado } from './funciones-contratos/contrato-innominado';
import { contratoIntermitente } from './funciones-contratos/contrato-intermitente';
import { contratoNecesidadMercado } from './funciones-contratos/contrato-necesidad-mercado';
import { contratoObraDeterminada } from './funciones-contratos/contrato-obra-determinada';
import { contratoOcacional } from './funciones-contratos/contrato-ocacional';
import { contratoPorSuplencia } from './funciones-contratos/contrato-por-suplencia';
import { contratoPorTemporada } from './funciones-contratos/contrato-por-temporada';
import { contratoReconversionEmpresarial } from './funciones-contratos/contrato-reconversion-empresarial';
import { contratoServicioEspecifico } from './funciones-contratos/contrato-servicio-especifico';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { dateFunctions } from 'src/app/utils/dateFunctions';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-duodecimo-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './duodecimo-proceso.component.html',
  styleUrls: ['./duodecimo-proceso.component.css'],
})
export class DuodecimoProcesoComponent {
  datosLocales: any = {};
  registroTrabajador: any;
  registroEmpleador: any;
  urlpdf: any;
  safePdfUrl: SafeResourceUrl;
  mostrarParrafo: boolean = false;
  prueba_meses: string = '';
  prueba_inicio: string = '';
  prueba_termino: string = '';
  fechaFormateada: string = '';
  num_valores: Array<string> = [];
  fechaActual = new Date();
  fechaActualValor: string = '';

  constructor(
    public ts: TrabajadorService,
    public es: EmpleadorService,
    private router: Router,
    private cl: ContratoLocalStorageService,
    private sanitizer: DomSanitizer,
    private convertirFormatoFecha: dateFunctions
  ) {
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }
  ngOnInit(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');
    this.datosLocales = contratoLocal;

    this.num_valores = this.numeracion_valores();

    if (this.datosLocales.trabajador_confianza == true) {
      this.prueba_meses = '6 Meses';
      this.prueba_inicio = this.datosLocales.fecha_inicio;
      this.fechaFormateada = this.formatearFecha(this.sumarMeses(6));
      this.prueba_termino = this.fechaFormateada;
    } else if (this.datosLocales.trabajador_direccion == true) {
      this.prueba_meses = '12 Meses';
      this.prueba_inicio = this.datosLocales.fecha_inicio;
      this.fechaFormateada = this.formatearFecha(this.sumarMeses(12));
      this.prueba_termino = this.fechaFormateada;
    } else {
      this.prueba_meses = '3 Meses';
      this.prueba_inicio = this.datosLocales.fecha_inicio;
      this.fechaFormateada = this.formatearFecha(this.sumarMeses(3));
      this.prueba_termino = this.fechaFormateada;
    }

    const trabajador$ = this.getTrabajador(this.datosLocales.trabajador);
    /* const empleador$ = this.getEmpleador(this.datosLocales.empleador); */
    const empleador$ = this.getEmpleador();

    forkJoin([trabajador$, empleador$]).subscribe(
      ([trabajadorData, empleadorData]) => {
        this.registroTrabajador = trabajadorData;
        this.registroEmpleador = empleadorData;

        console.log(this.registroTrabajador.trabajador);
        console.log(this.registroEmpleador.empleador);

        let modeloContrato1;

        switch (this.datosLocales.modelo_contrato) {
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INICIO DE ACTIVIDAD':
            modeloContrato1 = contratoInicioActividad(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INCREMENTO DE ACTIVIDAD':
            modeloContrato1 = contratoIncrementoActividad(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR NECESIDAD DE MERCADO':
            modeloContrato1 = contratoNecesidadMercado(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR RECONVERSION EMPRESARIAL':
            modeloContrato1 = contratoReconversionEmpresarial(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE OCASIONAL':
            modeloContrato1 = contratoOcacional(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE SUPLENCIA':
            modeloContrato1 = contratoPorSuplencia(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE EMERGENCIA':
            modeloContrato1 = contratoDeEmergencia(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR OBRA DETERMINADA':
            modeloContrato1 = contratoObraDeterminada(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR SERVICIO ESPECÍFICO':
            modeloContrato1 = contratoServicioEspecifico(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD INTERMITENTE':
            modeloContrato1 = contratoIntermitente(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD DE CONTRATO DE TEMPORADA':
            modeloContrato1 = contratoPorTemporada(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO INNOMINADO A PLAZO FIJO':
            modeloContrato1 = contratoInnominado(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO':
            modeloContrato1 = contratoIndeterminado(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN FISCALIZACION':
            modeloContrato1 = contratoIndeterminadoSinFiscalizacion(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          case 'MODELO DE CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN CONFIANZA Y CON FISCALIZACION':
            modeloContrato1 = contratoIndeterminadoConFiscalizacion(
              this.registroTrabajador,
              this.registroEmpleador,
              this.datosLocales,
              this.prueba_meses,
              this.prueba_inicio,
              this.prueba_termino,
              this.fechaFormateada,
              this.num_valores,
              this.fechaActualValor,
              this.convertirFormatoFecha
            );
            break;
          default:
        }

        this.generarPdfMake(modeloContrato1);
        this.fecha_actual_formateada();
      }
    );

    this.fecha_actual_formateada();
  }

  fecha_actual_formateada(): void {
    const fechaActualFormateada = new Intl.DateTimeFormat(
      'es-ES',
      this.opcionesDeFormato
    ).format(this.fechaActual);

    this.fechaActualValor = fechaActualFormateada;
  }

  // Formatear la fecha
  opcionesDeFormato: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  numeracion_valores(): Array<string> {
    // Tus arrays y variables originales
    const contratoLocal = this.cl.getItem('contratoLocal');
    this.datosLocales = contratoLocal;

    let clausulasVisibles: boolean[] = [];

    switch (this.datosLocales.modelo_contrato) {
      case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE SUPLENCIA':
        const clausulasVisibles1: boolean[] = [
          true, //0
          true, //1
          true, //2
          true, //3
          this.datosLocales.trabajador_confianza, //4
          this.datosLocales.trabajador_direccion, //5
          this.datosLocales.fiscalizacion_inmediata, //6
          true, //7
          this.datosLocales.jornada_maxima, //8
          true, // 9
          true, // 10
          true, // 11
          true, // 12
          true, // 13
          this.datosLocales.exclusividad, // 14
          true, // 15
          true, // 16
          true, // 17
          true, // 18
          true, // 19
          this.datosLocales.obligaciones_compromisos, // 20
          this.datosLocales.propiedad_intelectual, // 21
          this.datosLocales.proteccion_datos, // 22
          true, // 23
          true, // 24
          true, // 25
          this.datosLocales.confidencialidad, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];

        clausulasVisibles = clausulasVisibles1;
        break;

      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR OBRA DETERMINADA':
        const clausulasVisibles2: boolean[] = [
          true, //0
          true, //1
          true, //2
          this.datosLocales.trabajador_confianza, //3
          this.datosLocales.trabajador_direccion, //4
          this.datosLocales.fiscalizacion_inmediata, //5
          this.datosLocales.jornada_maxima, //6
          true, //7
          true, //8
          true, // 9
          true, // 10
          this.datosLocales.obligaciones_compromisos, // 11
          true, // 12
          true, // 13
          this.datosLocales.exclusividad, // 14
          true, // 15
          true, // 16
          true, // 17
          this.datosLocales.propiedad_intelectual, // 18
          this.datosLocales.confidencialidad, // 19
          true, // 20
          this.datosLocales.tecnologia_informacion, // 21
          this.datosLocales.proteccion_datos, // 22
          true, // 23
          true, // 24
          true, // 25
          true, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];

        clausulasVisibles = clausulasVisibles2;
        break;

      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD INTERMITENTE':
        const clausulasVisibles3: boolean[] = [
          true, //0
          true, //1
          true, //2
          true, //3
          true, //4
          true, //5
          this.datosLocales.trabajador_confianza, //6
          this.datosLocales.trabajador_direccion, //7
          this.datosLocales.fiscalizacion_inmediata, //8
          this.datosLocales.jornada_maxima, //9
          true, // 10
          true, // 11
          true, // 12
          this.datosLocales.obligaciones_compromisos, // 13
          true, // 14
          true, // 15
          true, // 16
          true, // 17
          true, // 18
          true, // 19
          true, // 20
          true, // 21
          true, // 22
          this.datosLocales.confidencialidad, // 23
          true, // 24
          this.datosLocales.tecnologia_informacion, // 25
          this.datosLocales.proteccion_datos, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
          true, // 32
        ];

        clausulasVisibles = clausulasVisibles3;
        break;

      case 'CONTRATO DE TRABAJO INNOMINADO A PLAZO FIJO':
        const clausulasVisibles4: boolean[] = [
          true, //0
          true, //1
          true, //2
          this.datosLocales.jornada_maxima, //3
          true, //4
          true, //5
          this.datosLocales.trabajador_direccion, //6
          this.datosLocales.trabajador_confianza, //7
          this.datosLocales.obligaciones_compromisos, //8
          true, // 9
          true, // 10
          true, // 11
          this.datosLocales.exclusividad, // 12
          true, // 13
          true, // 14
          true, // 15
          this.datosLocales.propiedad_intelectual, // 16
          this.datosLocales.confidencialidad, // 17
          true, // 18
          this.datosLocales.tecnologia_informacion, // 19
          this.datosLocales.proteccion_datos, // 20
          true, // 21
          true, // 22
          true, // 23
          true, // 24
          true, // 25
          true, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];

        clausulasVisibles = clausulasVisibles4;
        break;
      case 'MODELO DE CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN CONFIANZA Y CON FISCALIZACION':
        const clausulasVisibles5: boolean[] = [
          true, //0
          true, //1
          true, //2
          true, //3
          true, //4
          true, //5
          this.datosLocales.jornada_maxima, //6
          true, //7
          this.datosLocales.obligaciones_compromisos, //8
          true, // 9
          true, // 10
          true, // 11
          true, // 12
          true, // 13
          true, // 14
          true, // 15
          this.datosLocales.propiedad_intelectual, // 16
          this.datosLocales.confidencialidad, // 17
          true, // 18
          this.datosLocales.tecnologia_informacion, // 19
          this.datosLocales.proteccion_datos, // 20
          true, // 21
          true, // 22
          true, // 23
          true, // 24
          true, // 25
          true, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];

        clausulasVisibles = clausulasVisibles5;
        break;
      case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN FISCALIZACION':
        const clausulasVisibles6: boolean[] = [
          true, //0
          true, //1
          true, //2
          true, //3
          true, //4
          this.datosLocales.trabajador_confianza, //5
          this.datosLocales.trabajador_direccion, //6
          this.datosLocales.fiscalizacion_inmediata, //7
          true, //8
          this.datosLocales.jornada_maxima, // 9
          true, // 10
          this.datosLocales.obligaciones_compromisos, // 11
          true, // 12
          true, // 13
          this.datosLocales.exclusividad, // 14
          true, // 15
          true, // 16
          true, // 17
          true, // 18
          this.datosLocales.propiedad_intelectual, // 19
          this.datosLocales.confidencialidad, // 20
          true, // 21
          this.datosLocales.tecnologia_informacion, // 22
          this.datosLocales.proteccion_datos, // 23
          true, // 24
          true, // 25
          true, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];
        clausulasVisibles = clausulasVisibles6;
        break;
      case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO':
        const clausulasVisibles7: boolean[] = [
          true, //0
          true, //1
          true, //2
          true, //3
          true, //4
          this.datosLocales.trabajador_confianza, //5
          this.datosLocales.trabajador_direccion, //6
          this.datosLocales.fiscalizacion_inmediata, //7
          true, //8
          this.datosLocales.jornada_maxima, // 9
          true, // 10
          this.datosLocales.obligaciones_compromisos, // 11
          true, // 12
          true, // 13
          this.datosLocales.exclusividad, // 14
          true, // 15
          true, // 16
          true, // 17
          true, // 18
          this.datosLocales.propiedad_intelectual, // 19
          this.datosLocales.confidencialidad, // 20
          true, // 21
          this.datosLocales.tecnologia_informacion, // 22
          this.datosLocales.proteccion_datos, // 23
          true, // 24
          true, // 25
          true, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];
        clausulasVisibles = clausulasVisibles7;
        break;
      default:
        // contrato de emergencia
        // contrato incremento actividad
        // contrato necesidad mercado
        // contrato inicio actividad
        // contrato ocacional
        // contrato por temporada
        // contrato reconversion empresarial
        // contrato servicio especifico
        const clausulasVisibles8: boolean[] = [
          true, //0
          true, //1
          true, //2
          true, //3
          true, //4
          this.datosLocales.trabajador_confianza, //5
          this.datosLocales.trabajador_direccion, //6
          this.datosLocales.fiscalizacion_inmediata, //7
          this.datosLocales.jornada_maxima, //8
          true, // 9
          true, // 10
          true, // 11
          this.datosLocales.obligaciones_compromisos, // 12
          true, // 13
          this.datosLocales.exclusividad, // 14
          true, // 15
          true, // 16
          true, // 17
          true, // 18
          this.datosLocales.propiedad_intelectual, // 19
          this.datosLocales.confidencialidad, // 20
          true, // 21
          this.datosLocales.tecnologia_informacion, // 22
          this.datosLocales.proteccion_datos, // 23
          true, // 24
          true, // 25
          true, // 26
          true, // 27
          true, // 28
          true, // 29
          true, // 30
          true, // 31
        ];

        clausulasVisibles = clausulasVisibles8;
    }

    const ordinales: string[] = [
      'PRIMERA',
      'SEGUNDA',
      'TERCERA',
      'CUARTA',
      'QUINTA',
      'SEXTA',
      'SEPTIMA',
      'OCTAVA',
      'NOVENA',
      'DECIMA',
      'DECIMOPRIMERA',
      'DECIMOSEGUNDA',
      'DECIMOTERCERA',
      'DECIMOCUARTA',
      'DECIMOQUINTA',
      'DECIMOSEXTA',
      'DECIMOSEPTIMA',
      'DECIMOOCTAVA',
      'DECIMONOVENA',
      'VIGESIMO',
      'VIGESIMOPRIMERA',
      'VIGESIMOSEGUNDA',
      'VIGESIMOTERCERA',
      'VIGESIMOCUARTA',
      'VIGESIMOQUINTA',
      'VIGESIMOSEXTA',
      'VIGESIMOSEPTIMA',
      'VIGESIMOOCTAVA',
      'VIGESIMONOVENA',
      'TRIGESIMO',
      'TRIGESIMOPRIMERA',
      'TRIGESIMOSEGUNDA',
    ];

    const ValorNoVisible: string = 'Sin_valor';

    // El array que llenarás con los ordinales correctos o "Sin_valor"
    let reubicar_ordinales_aqui: string[] = [];

    // Contador para los ordinales visibles
    let contadorVisible = 0;

    // Iterar sobre los arrays
    for (let i = 0; i < clausulasVisibles.length; i++) {
      if (clausulasVisibles[i]) {
        // Añadir el ordinal correspondiente al contador de visibles
        reubicar_ordinales_aqui.push(ordinales[contadorVisible]);
        contadorVisible++;
      } else {
        // Añadir "Sin_valor" si la cláusula no es visible
        reubicar_ordinales_aqui.push(ValorNoVisible);
      }
    }

    return reubicar_ordinales_aqui;

    // Ahora reubicar_ordinales_aqui contiene los ordinales de las cláusulas visibles y "Sin_valor" para las no visibles
    console.log(reubicar_ordinales_aqui);
  }

  sumarMeses(meses: number) {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + meses);
    return fecha;
  }

  formatearFecha(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  generarPdfMake(docDefinition: any) {
    const pdfGenerado = pdfMake.createPdf(docDefinition);
    pdfGenerado.getDataUrl((dataUrl) => {
      this.urlpdf = dataUrl;
      console.log(this.urlpdf);
      // Aquí obtienes la URL del PDF
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlpdf
      );
    });
  }

  /* modeloContrato(datosTrabajador: any) {
   
  } */

  getTrabajador(id: any) {
    return this.ts.getTrabajadorById(id); // Devuelve el observable para su suscripción
  }

  /* getEmpleador(id: any) {
    return this.es.getEmpleadorById(id);
  } */

  getEmpleador() {
    return this.es.getActividadUltimoEmpleador();
  }
}
