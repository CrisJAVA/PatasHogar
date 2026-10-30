import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApplicationsService } from '../../services/applications.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector:'app-admin',standalone:true,imports:[FormsModule,RouterLink],
  templateUrl:'./admin.component.html'
})
export class AdminComponent {
  readonly applications=inject(ApplicationsService);
  private readonly notice=inject(NotificationService);
  readonly notes=signal<Record<string,string>>({});
  count(status:'PENDING'|'APPROVED'|'REJECTED'):number {return this.applications.applications().filter(a=>a.status===status).length;}
  statusText(status:string):string {return ({PENDING:'En revisión',APPROVED:'Aprobada',REJECTED:'Rechazada'} as Record<string,string>)[status]??status;}
  setNote(id:string,value:string):void {this.notes.update(notes=>({...notes,[id]:value}));}
  review(id:string,status:'APPROVED'|'REJECTED'):void {
    const note=this.notes()[id]?.trim()||'';
    if(status==='REJECTED'&&note.length<8){this.notice.show('Escribe un motivo de rechazo de al menos 8 caracteres.');return;}
    this.applications.review(id,status,status==='APPROVED' ? 'Aprobación preliminar. Contactar por correo para agendar una visita presencial de verificación.':note);
    this.notice.show(status==='APPROVED'?'Solicitud aprobada en demo. El correo no se ha enviado.':'Solicitud rechazada en demo. El correo no se ha enviado.');
  }
}
