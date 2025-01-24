import { Component } from '@angular/core';
import {
  NgForm,
  NgModel,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Empleador } from 'src/app/interface/empleador';
import { EmpleadorService } from 'src/app/services/empleador.service';
/* import { ToastrService } from 'ngx-toastr'; */
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent {
  myForm: FormGroup;
  datosEmpleador: any = {};
  modoEdicion = false;
  empleadorIdEditar: number | undefined;
  empleador: Empleador | undefined;

  constructor(
    public empleadorService: EmpleadorService,
    private router: Router,
    /* private Toastr: ToastrService, */
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      empleador: ['', Validators.required],
      ruc: ['', Validators.required],
      domicilio: ['', Validators.required],
      /* id_actividad_economica: ['', Validators.required], */
      representante_legal: ['', Validators.required],
      dni_representante_legal: ['', Validators.required],
      cargo_representante_legal: ['', Validators.required],
      numero_partida_poderes: ['', Validators.required],
      numero_asiento: ['', Validators.required],
      oficina_registral: ['', Validators.required],
      numero_partida_registral: ['', Validators.required],
      /* fecha_inicio_actividades: ['', Validators.required], */
    });
  }

  habilitarEdicion(id: number = 1) {
    this.modoEdicion = true;
    this.empleadorIdEditar = id;
    this.obtenerDatosEmpleadoParaEdicion(id);
  }

  obtenerDatosEmpleadoParaEdicion(id: number) {
    this.empleadorService.getEmpleadorById(id).subscribe((empleador) => {
      this.myForm.patchValue({
        empleador: empleador.empleador,
        ruc: empleador.ruc,
        domicilio: empleador.domicilio,
        representante_legal: empleador.representante_legal,
        dni_representante_legal: empleador.dni_representante_legal,
        cargo_representante_legal: empleador.cargo_representante_legal,
        numero_partida_poderes: empleador.numero_partida_poderes,
        numero_asiento: empleador.numero_asiento,
        oficina_registral: empleador.oficina_registral,
        numero_partida_registral: empleador.numero_partida_registral,
        // Otras propiedades si existen
      });
    });
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.EmpleadorById();
  }

  EmpleadorById() {
    return this.empleadorService.getEmpleadorById(1).subscribe((data: {}) => {
      this.empleador = data;
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      this.datosEmpleador = this.myForm.value;

      if (this.modoEdicion && this.empleadorIdEditar) {
        this.empleadorService
          .updateEmpleador(this.empleadorIdEditar, this.datosEmpleador)
          .subscribe((response) => {
            /* this.Toastr.success('Datos actualizados correctamente'); */
            this.modoEdicion = false; // Deshabilitar el modo de edición después de la actualización
            window.location.reload();
          });
      } else {
        this.empleadorService
          .createEmpleador(this.datosEmpleador)
          .subscribe((response) => {
            /* this.router.navigate(['admin/contratacion/contrato/proceso_1']); */
            /* this.Toastr.success('Datos ingresados correctamente'); */
          });
      }
    } else {
      /* this.Toastr.error('Por favor, completa todos los campos correctamente.'); */
    }
  }
}
