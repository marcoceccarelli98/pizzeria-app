import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Inserisci username e password';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);

        if (response.success) {
          // Login riuscito
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Login fallito';
        }
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
        if (error.status === 401) {
          this.errorMessage = 'Username o password non validi';
        } else if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Dati non validi';
        } else {
          this.errorMessage = 'Si è verificato un errore durante il login';
        }
      },
    });
  }
}
