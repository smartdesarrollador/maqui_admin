import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import { myFunctions } from 'src/app/utils/myFunctions';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tercer-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './tercer-proceso.component.html',
  styleUrls: ['./tercer-proceso.component.css'],
})
export class TercerProcesoComponent implements OnInit {
  datosRecuperados: any;
  registroTrabajador: any;
  selectedValue: string = '';
  datosLocales: any = {};
  @ViewChild('form1', { static: true }) form1: any;

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService,
    private myFunctions: myFunctions
  ) {}

  ngOnInit() {
    this.asignarJornada();
    this.getTrabajador(this.datosLocales.trabajador);
    this.myFunctions.scrollToTop();
  }

  asignarJornada(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (this.datosLocales.jornada) {
        this.selectedValue = this.datosLocales.jornada;
      } else {
        this.selectedValue = '';
      }
    }
  }

  getTrabajador(id: any) {
    this.ts.getTrabajadorById(id).subscribe((data) => {
      console.log(data);
      this.registroTrabajador = data;
    });
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.jornada = this.selectedValue;

      this.cl.setItem('contratoLocal', contratoLocaldatos);
      this.router.navigate(['admin/contratacion/contrato/proceso_4']);
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
