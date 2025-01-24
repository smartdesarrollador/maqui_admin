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
  selector: 'app-octavo-proceso-b',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './octavo-proceso-b.component.html',
  styleUrls: ['./octavo-proceso-b.component.css'],
})
export class OctavoProcesoBComponent {
  selectedValue: string = '';
  tercera_pregunta: string = '';
  @ViewChild('form1', { static: true }) form1: any;

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log(this.tercera_pregunta);
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.pregunta_3 = this.tercera_pregunta;

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
