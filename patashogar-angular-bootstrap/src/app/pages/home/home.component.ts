import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountUpComponent } from '../../components/count-up/count-up.component';
import { DonationService } from '../../services/donation.service';
import { NotificationService } from '../../services/notification.service';
import { SheltersService } from '../../services/shelters.service';

@Component({
  selector:'app-home',standalone:true,imports:[RouterLink,FormsModule,CountUpComponent],
  templateUrl:'./home.component.html'
})
export class HomeComponent implements AfterViewInit,OnDestroy {
  readonly donation=inject(DonationService);
  readonly notice=inject(NotificationService);
  readonly shelters=inject(SheltersService);
  readonly amounts=[1,5,10,20];
  readonly selectedAmount=signal(5);
  readonly showCustom=signal(false);
  customAmount:number|null=null;
  readonly heroIndex=signal(0);
  readonly fillingAmounts=signal(new Set<number>());
  readonly ctaFilling=signal(false);
  readonly heroImages=[
    {src:'assets/hero-dog.webp',alt:'Perro esperando un hogar'},
    {src:'assets/rescue.webp',alt:'Animal protegido en un refugio'},
    {src:'assets/shelter-3.webp',alt:'Animales rescatados'},
    {src:'assets/shelter-4.webp',alt:'Refugio de animales'},
    {src:'assets/shelter-5.webp',alt:'Gatos de albergue'},
    {src:'assets/shelter-6.webp',alt:'Perros en su refugio'}
  ];
  @ViewChild('shelterRail') rail?:ElementRef<HTMLElement>;
  private cycle?:ReturnType<typeof setInterval>;
  private timers:ReturnType<typeof setTimeout>[]=[];
  ngAfterViewInit():void {
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      this.cycle=setInterval(()=>this.heroIndex.update(i=>(i+1)%this.heroImages.length),5200);
    }
  }
  animateAmount(amount:number):void {
    if(this.fillingAmounts().has(amount)) return;
    this.fillingAmounts.update(values=>new Set([...values,amount]));
    this.timers.push(setTimeout(()=>this.fillingAmounts.update(values=>{const next=new Set(values);next.delete(amount);return next;}),1100));
  }
  animateCta():void {
    if(this.ctaFilling()) return;
    this.ctaFilling.set(true);
    this.timers.push(setTimeout(()=>this.ctaFilling.set(false),1300));
  }
  chooseAmount(amount:number):void {this.selectedAmount.set(amount);this.showCustom.set(false);}
  quickDonate():void {
    const amount=this.showCustom()? Number(this.customAmount) : this.selectedAmount();
    if(!Number.isFinite(amount)||amount<1||amount>50000){this.notice.show('Ingresa un monto válido entre S/1 y S/50 000.');return;}
    this.donation.open(Math.round(amount*100)/100);
  }
  moveCarousel(direction:-1|1):void {
    const el=this.rail?.nativeElement;
    if(!el) return;
    el.scrollBy({left:direction*(el.clientWidth*.78),behavior:'smooth'});
  }
  ngOnDestroy():void {if(this.cycle)clearInterval(this.cycle);this.timers.forEach(clearTimeout);}
}
