import { Injectable, signal } from '@angular/core';
@Injectable({providedIn:'root'})
export class NotificationService {
  readonly message = signal('');
  private timer?: ReturnType<typeof setTimeout>;
  show(message: string): void {
    if (this.timer) clearTimeout(this.timer);
    this.message.set(message);
    this.timer = setTimeout(() => this.message.set(''), 4800);
  }
}
