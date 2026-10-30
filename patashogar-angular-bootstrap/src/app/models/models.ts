export type UserRole = 'ADMIN' | 'SHELTER' | 'DONOR';
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type PaymentMethod = 'YAPE' | 'CARD';

export interface Shelter {
  id: number;
  name: string;
  city: 'Ica' | 'Pisco' | 'Chincha';
  image: string;
  description: string;
  need: string;
  raised: number;
  goal: number;
  badge: string;
  verified: boolean;
}
export interface RegisterShelterRequest {
  shelterName: string;
  address: string;
  contactName: string;
  phone: string;
  animalCount: number;
  email: string;
  needs: string;
  consent: boolean;
}
export interface ShelterApplication extends RegisterShelterRequest {
  id: string;
  createdAt: string;
  status: ApplicationStatus;
  reviewedAt?: string;
  decisionNote?: string;
}
export interface DonationIntent {
  shelterId: number | null;
  amountPEN: number;
  method: PaymentMethod;
}
export interface HostedCheckoutResponse {
  checkoutUrl: string; // URL validada que devuelve el backend tras crear sesión con la pasarela.
  paymentId: string;
}
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}
