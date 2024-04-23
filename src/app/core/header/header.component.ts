import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { AvatarComponent, AvatarSize, AvatarType } from '../../shared/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppBarModule, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public mockUser = {
    src: '',
    size: AvatarSize.S,
    name: 'Aleks Radivojevic',
    type: AvatarType.Circle
  }
}
