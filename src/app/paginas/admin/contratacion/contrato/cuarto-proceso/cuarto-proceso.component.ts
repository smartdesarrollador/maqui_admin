import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuarto-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './cuarto-proceso.component.html',
  styleUrls: ['./cuarto-proceso.component.css'],
})
export class CuartoProcesoComponent implements OnInit {
  selectedValue: string;
  datosLocales: any = {};
  @ViewChild('form1', { static: true }) form1: any;
  Swal = require('sweetalert2');

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {
    this.selectedValue = '';
  }

  ngOnInit() {
    this.asignarTipoContrato();
  }

  asignarTipoContrato(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (this.datosLocales.tipo_contrato) {
        this.selectedValue = this.datosLocales.tipo_contrato;
      } else {
        this.selectedValue = '';
      }
    }
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log('ingresaste');
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.tipo_contrato = this.selectedValue;

      this.cl.setItem('contratoLocal', contratoLocaldatos);

      if (
        contratoLocaldatos.jornada == 'Jornada Tiempo completo' &&
        this.selectedValue == 'Contrato modal'
      ) {
        this.router.navigate(['admin/contratacion/contrato/proceso_5_a']);
      }

      if (
        contratoLocaldatos.jornada == 'Jornada Tiempo completo' &&
        this.selectedValue == 'Contrato a plazo indeterminado'
      ) {
        this.router.navigate(['admin/contratacion/contrato/proceso_5_b']);
      }

      if (
        contratoLocaldatos.jornada == 'Jornada Tiempo Parcial' &&
        this.selectedValue == 'Contrato modal'
      ) {
        this.router.navigate(['admin/contratacion/contrato/proceso_5_c']);
      }

      if (
        contratoLocaldatos.jornada == 'Jornada Tiempo Parcial' &&
        this.selectedValue == 'Contrato a plazo indeterminado'
      ) {
        this.router.navigate(['admin/contratacion/contrato/proceso_5_d']);
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
