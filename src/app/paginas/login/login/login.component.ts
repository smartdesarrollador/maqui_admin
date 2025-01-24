import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
/* import { ToastrService } from 'ngx-toastr'; */
import { DataService } from 'src/app/services/login/data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [DataService /* , ToastrService */],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  submitted = false;
  data: any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    /* private toastr: ToastrService, */
    private dataService: DataService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.dataService.login(this.form.value).subscribe((res) => {
      this.data = res;
      /* console.log(res); */
      if (this.data.status === 1) {
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/admin/dashboard']);
        /*  this.toastr.success(
          JSON.stringify(this.data.message),
          JSON.stringify(this.data.code),
          {
            timeOut: 2000,
            progressBar: true,
          }
        ); */
      } else if (this.data.status === 0) {
        /* this.toastr.error(
          JSON.stringify(this.data.message),
          JSON.stringify(this.data.code),
          {
            timeOut: 2000,
            progressBar: true,
          }
        ); */
        this.alerta();
      }
    });
  }

  alerta() {
    Swal.fire({
      icon: 'error',
      title: 'Correo o Contraseña incorrecto',
    });
  }
}
