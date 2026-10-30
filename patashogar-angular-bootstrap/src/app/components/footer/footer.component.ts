import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DonationService } from '../../services/donation.service';
@Component({
  selector:'app-footer',standalone:true,imports:[RouterLink],
  templateUrl:'./footer.component.html'
})
export class FooterComponent {readonly donation=inject(DonationService);}
