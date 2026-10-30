import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DonationDialogComponent } from './components/donation-dialog/donation-dialog.component';
import { NotificationService } from './services/notification.service';

@Component({
  selector:'app-root',
  standalone:true,
  imports:[RouterOutlet,HeaderComponent,FooterComponent,DonationDialogComponent],
  templateUrl:'./app.component.html'
})
export class AppComponent {readonly notice = inject(NotificationService);}
