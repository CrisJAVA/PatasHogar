import { Component, OnDestroy, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Shelter } from '../../models/models';
import { DonationService } from '../../services/donation.service';
import { SheltersService } from '../../services/shelters.service';

@Component({
  selector:'app-shelters',standalone:true,imports:[FormsModule,RouterLink],
  templateUrl:'./shelters.component.html'
})
export class SheltersComponent implements OnInit,OnDestroy {
  readonly shelters=inject(SheltersService);
  readonly donation=inject(DonationService);
  readonly search=signal('');
  readonly city=signal('');
  readonly selectedId=signal<number>(1);
  readonly selected=computed(()=>this.shelters.shelters().find(item=>item.id===this.selectedId())??null);
  readonly filtered=computed(()=>{
    const query=this.search().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
    const city=this.city();
    return this.shelters.shelters().filter(item=>
      (!city||item.city===city) &&
      (!query||`${item.name} ${item.description} ${item.need} ${item.city}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query)));
  });
  readonly typedTitle=signal('');
  readonly typedDescription=signal('');
  readonly typedNeed=signal('');
  readonly typing=signal(true);
  readonly imageReady=signal(false);
  private typingTimers:ReturnType<typeof setTimeout>[]=[];
  private imageTimer?:ReturnType<typeof setTimeout>;
  ngOnInit():void {const initial=this.shelters.shelters()[0];if(initial)this.selectShelter(initial);}
  percentage(shelter:Shelter):number {return Math.min(100,Math.round(100*shelter.raised/shelter.goal));}
  selectShelter(shelter:Shelter):void {
    this.cancelTyping();
    this.selectedId.set(shelter.id);
    this.typedTitle.set('');this.typedDescription.set('');this.typedNeed.set('');
    this.typing.set(true);
    this.imageReady.set(false);
    this.imageTimer=setTimeout(()=>this.imageReady.set(true),35);
    // Animación por caracteres: los temporizadores se cancelan al elegir otro albergue.
    this.typeField(shelter.name,this.typedTitle,0,27);
    this.typeField(shelter.description,this.typedDescription,280,14);
    this.typeField(shelter.need,this.typedNeed,700,14,()=>this.typing.set(false));
  }
  private typeField(text:string,target:WritableSignal<string>,delay:number,pace:number,onDone?:()=>void):void {
    for(let i=1;i<=text.length;i++){
      this.typingTimers.push(setTimeout(()=>{target.set(text.slice(0,i));if(i===text.length)onDone?.();},delay+i*pace));
    }
  }
  private cancelTyping():void {this.typingTimers.forEach(clearTimeout);this.typingTimers=[];if(this.imageTimer)clearTimeout(this.imageTimer);}
  ngOnDestroy():void {this.cancelTyping();}
}
