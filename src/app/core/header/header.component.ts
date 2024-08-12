import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { AvatarComponent, AvatarData, AvatarSize, AvatarType } from '../../shared/avatar';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '@angular/fire/auth';
import { catchError, finalize, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Route } from '../../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppBarModule, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  public authService = inject(AuthService);
  public user!: User | null;

  public avatar: AvatarData = {
    src: '',
    size: AvatarSize.S,
    name: 'Aleks Radivojevic',
    email: '@',
    type: AvatarType.Circle,
  };

  public ngOnInit(): void {
    this.authService.user$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((aUser: User | null) => {
          this.user = aUser;
          this.avatar = {
            ...this.avatar,
            name: this.user?.displayName || '',
            email: this.user?.email as string,
          }
          this.cdr.markForCheck();
        }),
        catchError((err) => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
        finalize(() => console.log('second finalize() block executed'))
      )
      .subscribe();
  };

  public logout(): void {
    this.authService.logout().pipe(
      tap(() => this.router.navigate([Route.Login])),
      catchError((err) => {
        // TODO: Create error interceptor and handle this error 
        alert('Something went wrong')
        return of();
      }),
    ).subscribe()
  }
}
