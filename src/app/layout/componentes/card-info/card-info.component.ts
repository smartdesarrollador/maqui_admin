import { Component, OnInit } from '@angular/core';
import { MisionService } from 'src/app/services/mision.service';
import { Mision } from 'src/app/models/mision';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css',
})
export class CardInfoComponent {
  datos_mision: any = [];
  urlRaiz = environment.urlRaiz + '/';

  constructor(public cs: MisionService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    return this.cs.getCategories().subscribe((data: {}) => {
      console.log(data);
      this.datos_mision = data;
    });
  }
}
