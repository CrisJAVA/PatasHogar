import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector:'app-auth',standalone:true,imports:[ReactiveFormsModule,RouterLink],
  templateUrl:'./auth.component.html'
})
export class AuthComponent {
  private readonly fb=inject(FormBuilder).nonNullable;
  private readonly notice=inject(NotificationService);
  readonly mode=signal<'login'|'register'>('login');
  readonly form=this.fb.group({name:[''],email:['',[Validators.required,Validators.email]],password:['',[Validators.required,Validators.minLength(8)]]});
  submit():void {
    if(this.form.controls.email.invalid || this.form.controls.password.invalid || (this.mode()==='register'&&this.form.controls.name.value.trim().length<3)){
      this.notice.show('Comprueba el correo, nombre y contraseña (mínimo 8 caracteres).');return;
    }
    this.notice.show('Autenticación pendiente de conexión con Spring Security. No se envió ni guardó tu contraseña.');
    this.form.controls.password.reset('');
  }
}
