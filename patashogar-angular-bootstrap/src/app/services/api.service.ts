import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DonationIntent, HostedCheckoutResponse, RegisterShelterRequest, Shelter, ShelterApplication, UserProfile } from '../models/models';

/** Contratos preparados para Spring Boot + Spring Security, no usados mientras demoMode=true. */
@Injectable({providedIn:'root'})
export class PatasApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;
  listShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.base}/shelters`);
  }
  submitApplication(data:RegisterShelterRequest): Observable<ShelterApplication> {
    return this.http.post<ShelterApplication>(`${this.base}/shelter-applications`, data, {withCredentials:true});
  }
  pendingApplications(): Observable<ShelterApplication[]> {
    return this.http.get<ShelterApplication[]>(`${this.base}/admin/shelter-applications?status=PENDING`,{withCredentials:true});
  }
  reviewApplication(id:string, status:'APPROVED'|'REJECTED', note:string): Observable<ShelterApplication> {
    return this.http.patch<ShelterApplication>(`${this.base}/admin/shelter-applications/${encodeURIComponent(id)}`,{status,note},{withCredentials:true});
  }
  currentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/auth/me`,{withCredentials:true});
  }
  createCheckout(intent:DonationIntent): Observable<HostedCheckoutResponse> {
    // El backend debe calcular importes, verificar albergue, crear sesión y retornar URL del proveedor.
    return this.http.post<HostedCheckoutResponse>(`${this.base}/donations/checkout-sessions`,intent,{withCredentials:true});
  }
}
