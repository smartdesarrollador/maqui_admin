import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-octavo-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './octavo-proceso.component.html',
  styleUrls: ['./octavo-proceso.component.css'],
})
export class OctavoProcesoComponent {
  trabajador_confianza: boolean = false;
  trabajador_direccion: boolean = false;
  datosLocales: any = {};

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit() {
    this.asignarCalificacionEspecial();
  }

  asignarCalificacionEspecial(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (
        this.datosLocales.trabajador_confianza == true ||
        this.datosLocales.trabajador_confianza == false
      ) {
        this.trabajador_confianza = this.datosLocales.trabajador_confianza;
        this.trabajador_direccion = this.datosLocales.trabajador_direccion;
      } else {
        this.trabajador_confianza = false;
        this.trabajador_direccion = false;
      }
    }
  }

  onCheckboxChange(checkboxName: string) {
    if (checkboxName === 'trabajador_confianza') {
      this.trabajador_direccion = false; // Deseleccionar "¿El trabajador es de Dirección?"
    } else if (checkboxName === 'trabajador_direccion') {
      this.trabajador_confianza = false; // Deseleccionar "¿El trabajador es de Confianza?"
    }
  }

  saveToLocalStorage() {
    const contratoLocaldatos = this.cl.getItem('contratoLocal');
    contratoLocaldatos.trabajador_confianza = this.trabajador_confianza;
    contratoLocaldatos.trabajador_direccion = this.trabajador_direccion;

    this.cl.setItem('contratoLocal', contratoLocaldatos);

    if (this.trabajador_confianza == true) {
      this.router.navigate(['admin/contratacion/contrato/proceso_8_a']);
    }

    if (this.trabajador_direccion == true) {
      this.router.navigate(['admin/contratacion/contrato/proceso_8_b']);
    }

    if (
      this.trabajador_confianza == false &&
      this.trabajador_direccion == false
    ) {
      this.router.navigate(['admin/contratacion/contrato/proceso_9']);
    }
  }
}
