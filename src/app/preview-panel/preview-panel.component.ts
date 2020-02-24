import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormMeta } from '../model/form-meta.object';
import { Subscription } from 'rxjs';
import { AppStateService } from '../app-state.service';
import { ElementMeta } from '../model/element-meta.model';

@Component({
  selector: 'app-preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.css']
})
export class PreviewPanelComponent implements OnInit, OnDestroy {

  formMeta: FormMeta;
  inTransitElementId: string;
  private currentFormMetaSubscription: Subscription;

  constructor(private appStateService: AppStateService) { 
    this.currentFormMetaSubscription = this.appStateService
    .getCurrentFormMeta().subscribe(formMetaData => {
      this.formMeta = formMetaData;
    });
  }

  ngOnInit(): void {

  }

  onMoveUp(elementId: string) : void {
    const currentElement: ElementMeta = this.getElementById(elementId);
    const currentOrder: number = currentElement.elementOrder;
    if(currentOrder <= 1) return;
    const previousElement: ElementMeta = this.getElementByOrder(currentOrder-1);
    currentElement.elementOrder--;
    previousElement.elementOrder++;
    this.sortElements();
    this.createTransitionEffect(currentElement.elementId);
  }

  onMoveDown(elementId: string) : void {
    const currentElement: ElementMeta = this.getElementById(elementId);
    const currentOrder: number = currentElement.elementOrder;
    if(currentOrder >= this.formMeta.elementsMeta.length) return;
    const nextElement: ElementMeta = this.getElementByOrder(currentOrder+1);
    currentElement.elementOrder++;
    nextElement.elementOrder--;
    this.sortElements();
    this.createTransitionEffect(currentElement.elementId);
  }

  createTransitionEffect(elementId: string) {
    this.inTransitElementId = elementId;
    setTimeout(() => {
      this.inTransitElementId = undefined;
    }, 1000);
  }

  getElementById(elementId: string): ElementMeta {
    if(!this.formMeta.elementsMeta) return undefined;
    for(let i=0; i<this.formMeta.elementsMeta.length; i++) {
      if(this.formMeta.elementsMeta[i].elementId == elementId) return this.formMeta.elementsMeta[i];
    }
    return undefined;
  }

  getElementByOrder(elementOrder: number): ElementMeta {
    if(!this.formMeta.elementsMeta) return undefined;
    for(let i=0; i<this.formMeta.elementsMeta.length; i++) {
      if(this.formMeta.elementsMeta[i].elementOrder == elementOrder) return this.formMeta.elementsMeta[i];
    }
    return undefined;
  }

  sortElements() : void {
    this.formMeta.elementsMeta.sort((e1, e2) => e1.elementOrder - e2.elementOrder);
  }

  ngOnDestroy(): void {
    this.currentFormMetaSubscription.unsubscribe();
  }
}
