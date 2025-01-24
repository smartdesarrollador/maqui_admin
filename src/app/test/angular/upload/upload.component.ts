import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Post } from '../post.model';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  files: any;
  submitted = false;
  data: any;
  form: FormGroup = new FormGroup({});
  post = new Post();
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  createForm() {
    this.form = this.formBuilder.group({
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files && event.target.files.length > 0) {
        this.files = event.target.files[0];
        console.log(this.files);
      } else {
        console.log('no se selecciono ningun archivo');
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.files, this.files.name);

    this.dataService.uploadData(formData).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }
}
