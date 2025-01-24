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
  selector: 'app-sexto-proceso-d',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './sexto-proceso-d.component.html',
  styleUrls: ['./sexto-proceso-d.component.css'],
})
export class SextoProcesoDComponent {
  selectedValue: string = '';
  primera_pregunta: string = '';
  segunda_pregunta: string = '';
  @ViewChild('form1', { static: true }) form1: any;
  datosLocales: any = {};
  nombre_proyecto: string = '';
  ubicacion_proyecto: string = '';

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit(): void {}

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log(this.primera_pregunta);
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.proyecto_obra_determinada = this.nombre_proyecto;
      contratoLocaldatos.ubicacion_obra_determinada = this.ubicacion_proyecto;

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
