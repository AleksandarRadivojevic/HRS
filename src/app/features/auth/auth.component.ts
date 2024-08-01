import {
  ChangeDetectionStrategy,
  Component,
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


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  private authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  public form!: FormGroup;
  public isLogin: boolean = true;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      alert('invalid');
      return;
    }

    const email: string = this.form.value.email;
    const password: string = this.form.value.password;
    // const email: string = this.form.value.email || 'admin@admin.com';
    // const password: string = this.form.value.password || 'adminadmin';

    if (this.isLogin) {
      this.authService.login(email, password);
    } else {
      this.authService.register(email, password);
    }
  }

  public toggleAuth() {
    this.isLogin = !this.isLogin;
  }
}
