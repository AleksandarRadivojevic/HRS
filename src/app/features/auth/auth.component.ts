import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { catchError, of, tap } from 'rxjs';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Route } from '../../app.routes';


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

  public form!: FormGroup;
  public isLogin!: boolean;

  public ngOnInit(): void {
    this.route.data.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((data: Data) => {
        this.isLogin = data['route'] === Route.Login;
        this.initForm();
      })
    ).subscribe()
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
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
    // const email: string = this.form.value.email || 'admin@admin.com';
    // const password: string = this.form.value.password || 'adminadmin';

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
        catchError((err) => {
          // TODO: Instead of alert please create proper handler on view
          alert('Invalid password')
          return of()
        })
      ).subscribe();
    }
  }

  public toggleAuth(): void {
    this.isLogin = !this.isLogin;
    this.router.navigate([this.isLogin ? Route.Login : Route.Signup]);
  }
}
