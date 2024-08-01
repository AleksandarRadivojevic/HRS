import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { AvatarComponent, AvatarSize, AvatarType } from '../../shared/avatar';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '@angular/fire/auth';
import { catchError, finalize, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppBarModule, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public authService = inject(AuthService);
  public cdr = inject(ChangeDetectorRef);

  public user = {
    src: '',
    size: AvatarSize.S,
    name: 'Aleks Radivojevic',
    email: '@',
    type: AvatarType.Circle,
  };

  ngOnInit() {
    this.authService.user$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((aUser: User | null) => {
          console.log('aUserrrr', aUser);
          this.user.email = aUser?.email || '';
          this.cdr.markForCheck();
        }),
        catchError((err) => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
        finalize(() => console.log('second finalize() block executed'))
      )
      .subscribe();
  }
}
