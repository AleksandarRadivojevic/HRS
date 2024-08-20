import { Injectable, signal } from '@angular/core';
import { AuthError } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  readonly authErrorMessages: Map = {
    'auth/email-already-in-use': 'Email already exists.',
    'auth/invalid-email': 'Invalid email.',
    'auth/internal-error': 'Internal error.',
    'auth/invalid-user-token': 'Invalid token.',
    'auth/invalid-credential': 'Invalid credentials.',
    'auth/user-token-expired': 'Token expired, please login again.',
    'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
  };

  private readonly defaultErrorMessage = 'Something went wrong, please try later.';

  public popupMessage = signal<string>('');

  constructor() {}

  getErrorMessage(error: AuthError): string {
    // console.log(error.code);
    return this.authErrorMessages[error.code] || this.defaultErrorMessage;
  }

  handleErrorPopup(error: AuthError): void {
    this.popupMessage.set(
      this.authErrorMessages[error.code] || this.defaultErrorMessage
    );
  }

  clearPopupMessage(): void {
    this.popupMessage.set('');
  }
}

interface Map {
  [key: string]: string;
}
