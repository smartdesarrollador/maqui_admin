import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-octavo-proceso-a',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './octavo-proceso-a.component.html',
  styleUrls: ['./octavo-proceso-a.component.css'],
})
export class OctavoProcesoAComponent {
  selectedValue: string = '';
  primera_pregunta: string = '';
  segunda_pregunta: string = '';
  @ViewChild('form1', { static: true }) form1: any;

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log(this.primera_pregunta);
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.pregunta_1 = this.primera_pregunta;
      contratoLocaldatos.pregunta_2 = this.segunda_pregunta;

      this.cl.setItem('contratoLocal', contratoLocaldatos);

      this.router.navigate(['admin/contratacion/contrato/proceso_9']);
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
