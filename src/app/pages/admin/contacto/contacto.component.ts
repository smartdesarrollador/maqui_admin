import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Contacto } from 'src/app/models/contacto.model';
import { ContactoService } from 'src/app/services/contacto.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  listContactos: any = [];
  files_date: any;
  submitted = false;
  data: any;
  form: FormGroup = new FormGroup({});
  urlRaiz = environment.urlRaiz + '/';
  post = new Contacto();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: ContactoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContactos();
  }

  loadContactos() {
    return this.dataService.getContactos().subscribe((data: {}) => {
      console.log(data);
      this.listContactos = data;
    });
  }
}
