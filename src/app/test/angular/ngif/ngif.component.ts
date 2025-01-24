import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ngif',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './ngif.component.html',
  styleUrls: ['./ngif.component.css'],
})
export class NgifComponent {
  openAlert: boolean = false;
  mostrar_en_consola(name: string) {
    console.log(name);

    this.openAlert = true;
  }
}
