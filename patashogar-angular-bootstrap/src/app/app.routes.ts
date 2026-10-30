import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../environments/environment';

// Los paneles de prueba NO deben exponerse al desactivar el modo demo.
const demoOnly = () => environment.demoMode || inject(Router).parseUrl('/ingresar');
export const routes: Routes = [
  {path:'', title:'Inicio | Patas Hogar', loadComponent:()=>import('./pages/home/home.component').then(m=>m.HomeComponent)},
  {path:'albergues', title:'Albergues | Patas Hogar', loadComponent:()=>import('./pages/shelters/shelters.component').then(m=>m.SheltersComponent)},
  {path:'registrar-albergue', title:'Mi albergue | Patas Hogar', loadComponent:()=>import('./pages/register-shelter/register-shelter.component').then(m=>m.RegisterShelterComponent)},
  {path:'ingresar', title:'Acceso | Patas Hogar', loadComponent:()=>import('./pages/auth/auth.component').then(m=>m.AuthComponent)},
  {path:'demo/admin', canActivate:[demoOnly], title:'Panel administrador (demo) | Patas Hogar', loadComponent:()=>import('./pages/admin/admin.component').then(m=>m.AdminComponent)},
  {path:'demo/albergue', canActivate:[demoOnly], title:'Panel albergue (demo) | Patas Hogar', loadComponent:()=>import('./pages/shelter-dashboard/shelter-dashboard.component').then(m=>m.ShelterDashboardComponent)},
  {path:'**', redirectTo:''}
];
