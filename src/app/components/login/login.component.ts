import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLogin } from '../../modules/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);

  private router: Router = inject(Router);

  private fb: FormBuilder = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  handleSubmit() {
    this.authService
      .login(this.form.value as AuthLogin)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
