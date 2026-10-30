import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DonationService } from '../../services/donation.service';

@Component({
  selector:'app-header',
  standalone:true,
  imports:[RouterLink,RouterLinkActive],
  templateUrl:'./header.component.html'
})
export class HeaderComponent {
  readonly donation=inject(DonationService);
  readonly menuOpen=signal(false);
}
