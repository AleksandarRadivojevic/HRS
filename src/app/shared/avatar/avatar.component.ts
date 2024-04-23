import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AvatarData } from './avatar.interface';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input({ required: true }) public set data(value: AvatarData) {
    if (!value.src) {
      this.nameInitials = value.name.split(" ").map((n)=>n[0]).join("");
    }
    this.avatar = value;
  }

  public avatar!: AvatarData;
  public nameInitials: string = '';

}
