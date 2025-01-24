import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
})
export class ToastrComponent {
  constructor(private Toastr: ToastrService) {}

  alerta(): void {
    this.Toastr.success('hola');
  }
}
