import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { catchError, exhaustMap, of, tap, from } from 'rxjs';
import { Route } from '../../app.routes';
import { updateProfile, AuthError } from '@angular/fire/auth';
import { AuthErrorMessages } from './interfaces/auth-errors';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  private authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  public errorMessage?: string;
  public form!: FormGroup;
  public isLogin!: boolean;

  public ngOnInit(): void {
    this.route.data.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((data: Data) => {
        this.isLogin = data['route'] === Route.Login;
        this.isLogin ? this.initLoginForm() : this.initSignupForm();
      })
    ).subscribe()
  }

  private initLoginForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private initSignupForm(): void {
    this.form = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      // TODO: Instead of alert please create proper handler on view
      alert('invalid');
      return;
    }

    const email: string = this.form.value.email;
    const password: string = this.form.value.password;
    const displayName: string = this.form.value.displayName;

    if (this.isLogin) {
      this.authService.login(email, password).pipe(
        tap(() => this.router.navigate(['/'])),
        catchError((err) => {
          // TODO: Instead of alert please create proper handler on view
          alert('Invalid password')
          return of()
        })
      ).subscribe();
    } else {
      this.authService.register(email, password).pipe(
        exhaustMap(data => {
          return from(updateProfile(data.user, {
            displayName: displayName,
          }));
        }),
        catchError((e: AuthError) => {
          this.errorMessage = AuthErrorMessages[e.code];
          this.cdr.markForCheck();
          return of();
        })
      ).subscribe();
    }
  }

  public toggleAuth(): void {
    this.isLogin = !this.isLogin;
    this.router.navigate([this.isLogin ? Route.Login : Route.Signup]);
  }
}
