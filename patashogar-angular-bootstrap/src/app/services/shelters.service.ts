import { Injectable, inject, signal } from '@angular/core';
import { DEMO_SHELTERS } from '../data/shelters.data';
import { environment } from '../../environments/environment';
import { PatasApiService } from './api.service';
import { Shelter } from '../models/models';

@Injectable({providedIn:'root'})
export class SheltersService {
  private readonly api = inject(PatasApiService);
  readonly shelters = signal<Shelter[]>(environment.demoMode ? DEMO_SHELTERS : []);
  constructor() {
    if (!environment.demoMode) {
      this.api.listShelters().subscribe({next:items=>this.shelters.set(items),error:error=>console.error('Error al cargar albergues desde API:',error)});
    }
  }
}
