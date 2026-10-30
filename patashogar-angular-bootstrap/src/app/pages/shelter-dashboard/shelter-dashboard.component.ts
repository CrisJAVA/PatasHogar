import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApplicationsService } from '../../services/applications.service';
@Component({
  selector:'app-shelter-dashboard',standalone:true,imports:[RouterLink],
  templateUrl:'./shelter-dashboard.component.html'
})
export class ShelterDashboardComponent {
  private readonly apps=inject(ApplicationsService);
  readonly current=computed(()=>this.apps.applications()[0]??null);
}
