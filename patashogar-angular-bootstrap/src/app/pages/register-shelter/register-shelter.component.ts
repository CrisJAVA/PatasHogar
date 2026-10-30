import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApplicationsService } from '../../services/applications.service';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';
import { PatasApiService } from '../../services/api.service';

@Component({
  selector:'app-register-shelter',standalone:true,imports:[ReactiveFormsModule,RouterLink],
  templateUrl:'./register-shelter.component.html'
})
export class RegisterShelterComponent {
  private readonly fb=inject(FormBuilder).nonNullable;
  private readonly applications=inject(ApplicationsService);
  private readonly notice=inject(NotificationService);
  private readonly api=inject(PatasApiService);
  readonly receipt=signal<{id:string;email:string}|null>(null);
  readonly form=this.fb.group({
    shelterName:['',[Validators.required,Validators.minLength(3)]],
    address:['',[Validators.required,Validators.minLength(5)]],
    contactName:['',[Validators.required,Validators.minLength(4)]],
    phone:['',[Validators.required,Validators.pattern(/^[+\d\s()-]{7,18}$/)]],
    animalCount:[1,[Validators.required,Validators.min(1)]],
    email:['',[Validators.required,Validators.email]],
    needs:['',[Validators.required,Validators.minLength(6)]],
    consent:[false,[Validators.requiredTrue]]
  });
  invalid(field:keyof typeof this.form.controls):boolean {
    const control=this.form.controls[field];return control.invalid && (control.touched||control.dirty);
  }
  submit():void {
    if(this.form.invalid){this.form.markAllAsTouched();this.notice.show('Completa todos los campos obligatorios para continuar.');return;}
    if(environment.demoMode){
      const application=this.applications.submit(this.form.getRawValue());
      this.receipt.set({id:application.id,email:application.email});
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    this.api.submitApplication(this.form.getRawValue()).subscribe({
      next:application=>{this.receipt.set({id:application.id,email:application.email});window.scrollTo({top:0,behavior:'smooth'});},
      error:()=>this.notice.show('No se pudo enviar la solicitud. Verifica la conexión con el servidor.')
    });
  }
}
