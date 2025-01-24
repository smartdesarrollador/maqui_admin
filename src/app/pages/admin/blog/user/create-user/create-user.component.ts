/* import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  nombre = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  rol = new FormControl('autor', [Validators.required]);

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    if (this.nombre.valid && this.email.valid && this.rol.valid) {
      const newUser = {
        nombre: this.nombre.value,
        email: this.email.value,
        rol: this.rol.value,
      };

      this.userService.createUser(newUser).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
 */
