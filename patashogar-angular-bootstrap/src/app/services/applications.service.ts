import { Injectable, signal } from '@angular/core';
import { ApplicationStatus, RegisterShelterRequest, ShelterApplication } from '../models/models';

/** DEMO: memoria volátil del navegador, NO persistencia ni envío de correo. */
@Injectable({providedIn:'root'})
export class ApplicationsService {
  readonly applications = signal<ShelterApplication[]>([]);
  readonly notificationQueue = signal<{to:string; status:ApplicationStatus; applicationId:string}[]>([]);

  submit(request: RegisterShelterRequest): ShelterApplication {
    const application: ShelterApplication = {
      ...request,
      id: `SOL-${String(this.applications().length + 1).padStart(4, '0')}`,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    this.applications.update(items => [application, ...items]);
    this.notificationQueue.update(items => [...items, {to: request.email, status:'PENDING', applicationId: application.id}]);
    return application;
  }

  review(id:string, status:'APPROVED' | 'REJECTED', note: string): void {
    const application = this.applications().find(item => item.id === id);
    if (!application || application.status !== 'PENDING') return;
    this.applications.update(items => items.map(item => item.id === id
      ? {...item, status, decisionNote: note, reviewedAt: new Date().toISOString()}
      : item));
    // Evento representado localmente. Spring Boot deberá enviar correo desde el servidor.
    this.notificationQueue.update(items => [...items, {to:application.email, status, applicationId:id}]);
  }
}
