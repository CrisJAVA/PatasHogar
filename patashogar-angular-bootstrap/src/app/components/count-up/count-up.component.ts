import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, signal } from '@angular/core';

@Component({
  selector:'app-count-up',standalone:true,
  templateUrl:'./count-up.component.html'
})
export class CountUpComponent implements AfterViewInit,OnDestroy {
  @Input({required:true}) target!:number;
  @Input() prefix='';
  @Input() digits=0;
  @ViewChild('numberEl',{static:true}) numberEl!:ElementRef<HTMLElement>;
  readonly current=signal(0);
  readonly done=signal(false);
  private observer?:IntersectionObserver;
  private frame=0;
  private started=false;
  formatted(value:number):string {
    return new Intl.NumberFormat('es-PE', {minimumFractionDigits:this.digits,maximumFractionDigits:this.digits}).format(value);
  }
  ngAfterViewInit():void {
    if (typeof IntersectionObserver==='undefined') {this.play();return;}
    this.observer=new IntersectionObserver(entries => {
      if(entries.some(entry=>entry.isIntersecting)) {this.play();this.observer?.disconnect();}
    }, {threshold:.35});
    this.observer.observe(this.numberEl.nativeElement);
  }
  private play():void {
    if(this.started) return;
    this.started=true;
    if(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches){this.current.set(this.target);this.done.set(true);return;}
    const start=performance.now();
    const tick=(now:number)=>{
      const p=Math.min(1,(now-start)/1850);
      const ease=1-Math.pow(1-p,3);
      this.current.set(Number((this.target*ease).toFixed(this.digits)));
      if(p<1){this.frame=requestAnimationFrame(tick);}else {this.current.set(this.target);this.done.set(true);}
    };
    this.frame=requestAnimationFrame(tick);
  }
  ngOnDestroy():void {this.observer?.disconnect();cancelAnimationFrame(this.frame);}
}
