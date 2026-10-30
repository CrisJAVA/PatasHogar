import { Injectable, signal } from '@angular/core';
import { DonationIntent } from '../models/models';

@Injectable({providedIn:'root'})
export class DonationService {
  readonly selected = signal<DonationIntent | null>(null);
  open(amountPEN = 5, shelterId: number | null = null): void {
    this.selected.set({amountPEN, shelterId, method: 'YAPE'});
  }
  setMethod(method: 'YAPE' | 'CARD'): void {
    this.selected.update(state => state ? {...state, method} : state);
  }
  close(): void {this.selected.set(null);}
}
