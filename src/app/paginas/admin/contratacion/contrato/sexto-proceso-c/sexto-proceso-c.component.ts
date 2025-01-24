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
  selector: 'app-sexto-proceso-c',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './sexto-proceso-c.component.html',
  styleUrls: ['./sexto-proceso-c.component.css'],
})
export class SextoProcesoCComponent {
  selectedValue: string = '';
  primera_pregunta: string = '';
  segunda_pregunta: string = '';
  @ViewChild('form1', { static: true }) form1: any;
  datosLocales: any = {};
  pregunta_motivo_contrato: string = '';
  pregunta_evidencia_documentaria: string = '';
  titulo_motivo: string = '';
  fechaActual = new Date();
  fecha_suplencia: Date = this.fechaActual;
  fechaSuplenciaFormateado: string;
  genero_suplencia: string = '';

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {
    this.fechaSuplenciaFormateado = this.convertirFechaSuplencia(
      this.fecha_suplencia
    );
  }

  ngOnInit(): void {}

  convertirFechaSuplencia(fecha: any): string {
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

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log(this.primera_pregunta);
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.fecha_suplencia = this.fechaSuplenciaFormateado;
      contratoLocaldatos.genero_suplencia = this.genero_suplencia;

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
