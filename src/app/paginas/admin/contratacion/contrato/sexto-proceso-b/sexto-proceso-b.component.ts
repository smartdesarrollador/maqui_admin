import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sexto-proceso-b',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './sexto-proceso-b.component.html',
  styleUrls: ['./sexto-proceso-b.component.css'],
})
export class SextoProcesoBComponent implements OnInit {
  selectedValue: string = '';
  primera_pregunta: string = '';
  segunda_pregunta: string = '';
  @ViewChild('form1', { static: true }) form1: any;
  datosLocales: any = {};
  pregunta_motivo_contrato: string = '';
  pregunta_evidencia_documentaria: string = '';
  titulo_motivo: string = '';

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');
    this.datosLocales = contratoLocal;

    this.preguntas_contrato(this.datosLocales.modelo_contrato);
  }

  preguntas_contrato(modelo_contrato: string): void {
    switch (modelo_contrato) {
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INCREMENTO DE ACTIVIDAD':
        this.pregunta_motivo_contrato =
          'Cual es el motivo para el incremento de actividades?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria para el incremento de actividades.';
        this.titulo_motivo = 'Motivo de incremento de actividad';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR NECESIDAD DE MERCADO':
        this.pregunta_motivo_contrato =
          'Cual es el motivo por necesidad de mercado?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria por necesidad de mercado.';
        this.titulo_motivo = 'Motivo por necesidad de mercado';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR RECONVERSION EMPRESARIAL':
        this.pregunta_motivo_contrato =
          'Cual es el motivo por reconversión empresarial?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria por reconversión empresarial.';
        this.titulo_motivo = 'Motivo por reconversión empresarial';
        break;
      case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE OCASIONAL':
        this.pregunta_motivo_contrato =
          'Cual es el motivo por modalidad ocasional?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria por modalidad ocasional.';
        this.titulo_motivo = 'Motivo por modalidad ocasional';
        break;
      case 'CONTRATO DE TRABAJO DE NATURALEZA ACCIDENTAL BAJO LA MODALIDAD DE EMERGENCIA':
        this.pregunta_motivo_contrato =
          'Cual es el motivo por modalidad de emergencia?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria por modalidad de emergencia.';
        this.titulo_motivo = 'Motivo por modalidad de emergencia';
        break;
      case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD INTERMITENTE':
        this.pregunta_motivo_contrato =
          'Cual es el motivo para modalidad intermitente?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria para modalidad intermitente.';
        this.titulo_motivo = 'Motivo para modalidad intermitente';
        break;
      case 'CONTRATO DE TRABAJO INNOMINADO A PLAZO FIJO':
        this.pregunta_motivo_contrato =
          'Cual es el motivo para trabajo innominado a plazo fijo?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria para trabajo innominado a plazo fijo.';
        this.titulo_motivo = 'Motivo para trabajo innominado a plazo fijo';
        break;
      case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO':
        this.pregunta_motivo_contrato =
          'Cual es el motivo para el trabajo a plazo indeterminado?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria para el trabajo a plazo indeterminado.';
        this.titulo_motivo = 'Motivo para el trabajo a plazo indeterminado';
        break;
      case 'CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN FISCALIZACION':
        this.pregunta_motivo_contrato =
          'Cual es el motivo para el trabajo a plazo indeterminado sin fiscalización?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria para el trabajo a plazo indeterminado sin fiscalización.';
        this.titulo_motivo =
          'Motivo para el trabajo a plazo indeterminado sin fiscalización';
        break;
      case 'MODELO DE CONTRATO DE TRABAJO A PLAZO INDETERMINADO - SIN CONFIANZA Y CON FISCALIZACION':
        this.pregunta_motivo_contrato =
          'Cual es el motivo para el trabajo a plazo indeterminado sin confianza y con fiscalización?';
        this.pregunta_evidencia_documentaria =
          'Evidencia documentaria para el trabajo a plazo indeterminado sin confianza y con fiscalización.';
        this.titulo_motivo =
          'Motivo para el trabajo a plazo indeterminado sin confianza y con fiscalización';
        break;
      default:
    }
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log(this.primera_pregunta);
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.motivo_contrato = this.primera_pregunta;
      contratoLocaldatos.evidencia_documentaria = this.segunda_pregunta;

      this.cl.setItem('contratoLocal', contratoLocaldatos);

      this.router.navigate(['admin/contratacion/contrato/proceso_7']);
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
