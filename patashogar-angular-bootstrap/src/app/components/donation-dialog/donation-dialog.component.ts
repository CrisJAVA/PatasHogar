import { Component, HostListener, inject } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { SheltersService } from '../../services/shelters.service';

@Component({
  selector:'app-donation-dialog',standalone:true,
  templateUrl:'./donation-dialog.component.html'
})
export class DonationDialogComponent {
  readonly donation=inject(DonationService);
  private readonly shelters=inject(SheltersService);
  getShelterName(id:number|null):string {return this.shelters.shelters().find(s=>s.id===id)?.name??'';}
  @HostListener('document:keydown.escape') close():void {this.donation.close();}
}
