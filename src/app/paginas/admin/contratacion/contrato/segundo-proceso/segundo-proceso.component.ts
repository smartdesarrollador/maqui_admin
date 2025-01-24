import { Component } from '@angular/core';
import {
  NgForm,
  NgModel,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';
/* import { ToastrService } from 'ngx-toastr'; */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-segundo-proceso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './segundo-proceso.component.html',
  styleUrls: ['./segundo-proceso.component.css'],
})
export class SegundoProcesoComponent {
  myForm: FormGroup;
  datosTrabajador: any = {};

  constructor(
    public trabajadorService: TrabajadorService,
    private router: Router,
    /* private Toastr: ToastrService, */
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      numero_documento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  get apellido_paterno() {
    return this.myForm.get('apellido_paterno') as FormControl;
  }

  get correo() {
    return this.myForm.get('correo') as FormControl;
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      this.datosTrabajador = this.myForm.value;

      this.trabajadorService
        .createTrabajador(this.datosTrabajador)
        .subscribe((response) => {
          this.router.navigate(['admin/contratacion/contrato/proceso_1']);
        });
    } else {
      /* this.Toastr.error('Por favor, completa todos los campos correctamente.'); */
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
