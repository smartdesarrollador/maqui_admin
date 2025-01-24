import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/login/data.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MustMatch } from '../confirmed.validator';
/* import { ToastrService } from 'ngx-toastr'; */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    /* private toastr: ToastrService */
  ) {
    this.form = this.formBuilder.group(
      {
        name: [null, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  get name() {
    return this.form.get('name') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }

  /*   get f() {
    return this.form.controls;
  } */

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.dataService.registerUser(this.form.value).subscribe((res) => {
      this.data = res;
      /* console.log(res); */
      if (this.data.status === 1) {
        /* this.toastr.success(
          JSON.stringify(this.data.message),
          JSON.stringify(this.data.code),
          {
            timeOut: 2000,
            progressBar: true,
          }
        ); */
        this.alerta();
      } else {
        /* this.toastr.error(
          JSON.stringify(this.data.message),
          JSON.stringify(this.data.code),
          {
            timeOut: 2000,
            progressBar: true,
          }
        ); */
      }
      this.submitted = false;
      this.form.get('name')?.reset();
      this.form.get('email')?.reset();
      this.form.get('password')?.reset();
      this.form.get('confirmPassword')?.reset();
    });
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
    });
  }
}
