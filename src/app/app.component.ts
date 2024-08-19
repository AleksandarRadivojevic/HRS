import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/component';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { ModalComponent } from './shared/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'house_reservation_app';
  errorHandlerService = inject(ErrorHandlerService);

  errorPopupMessage = computed<string>(() => this.errorHandlerService.popupMessage());

  public onCloseDialog(): void {
    this.errorHandlerService.clearPopupMessage();
  }
}
