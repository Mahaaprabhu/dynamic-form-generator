import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormMetaPairs } from '../model/form-meta-pairs.model';
import { AppStateService } from '../app-state.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormMeta } from '../model/form-meta.object';
import { ElementMeta } from '../model/element-meta.model';

@Component({
  selector: 'app-forms-panel',
  templateUrl: './forms-panel.component.html',
  styleUrls: ['./forms-panel.component.css']
})
export class FormsPanelComponent implements OnInit, OnDestroy {

  formMetasMapFromService: Map<number, FormMetaPairs>;
  private formMetasMapSubscription: Subscription;
  selectedFormMeta: FormMeta;
  selectedFormGroupControl: FormGroup;
  resultMap: Map<string, {label: string; value: any}>  = new Map<string, any>();
  displayResult: boolean = false;

  selectFormGroup: FormGroup = new FormGroup({
    'selectedFormId': new FormControl('')
  });

  constructor(private appStateService: AppStateService) {
    this.formMetasMapSubscription = this.appStateService.getFormMetasMap().subscribe(mapData => {
      this.formMetasMapFromService = mapData;
    }, error => {
      console.log(error);
    });
    this.appStateService.triggerSubjectPush();
  }

  onFormSelect() {
    this.displayResult = false;
    if(!this.selectFormGroup || !this.selectFormGroup.controls['selectedFormId']) return;
    const selectedFormId: number = Number(this.selectFormGroup.controls['selectedFormId'].value);
    if(!selectedFormId || selectedFormId == 0) return;
    this.selectedFormMeta = this.formMetasMapFromService.get(selectedFormId).formMeta;
    this.selectedFormGroupControl = this.formMetasMapFromService.get(selectedFormId).formGroupControl;
  }

  canThisElementBeEnabled(elementId: string): boolean {
    let currentElement: ElementMeta;
    for (let i = 0; i < this.selectedFormMeta.elementsMeta.length; i++) {
      if (this.selectedFormMeta.elementsMeta[i].elementId == elementId) {
        currentElement = this.selectedFormMeta.elementsMeta[i];
        break;
      }
    }
    if (!currentElement) return true; //? Can this actually occurs? Verify!
    const parentIds: string[] = currentElement.allParentElementIds;
    const triggerableParentIds: string[] = currentElement.anyParentElementIds;

    //Check whether all the mandatory parent elements are active...
    if(parentIds.length == 0 
      && triggerableParentIds.length == 0
      && (!currentElement.parentElementWithValue || !currentElement.parentElementWithValue.trim()))  return true;
    for (let i = 0; i < parentIds.length; i++) {
      if (this.selectedFormGroupControl.controls[parentIds[i]]
        && (this.selectedFormGroupControl.controls[parentIds[i]].disabled
          || this.selectedFormGroupControl.controls[parentIds[i]].invalid)) {
        return false;
      }
    }

    //Check whether the parent with value constraint matches...
    if(currentElement.parentElementWithValue && currentElement.parentElementWithValue.trim()){
      return this.isParentWithValueExists(currentElement);
    }
    
    //Check whether any of the triggerable parent elemnts are active...
    if (triggerableParentIds.length == 0) return true;
    for (let i = 0; i < triggerableParentIds.length; i++) {
      if (this.selectedFormGroupControl.controls[triggerableParentIds[i]]
        && this.selectedFormGroupControl.controls[triggerableParentIds[i]].enabled
          && this.selectedFormGroupControl.controls[triggerableParentIds[i]].valid) {
        return true;
      }
    }

    return false;
  }

  isParentWithValueExists(elementMeta: ElementMeta) {
    const parentIdWithValue: string = elementMeta.parentElementWithValue;
    if(!parentIdWithValue || !parentIdWithValue.trim()) return true;
    const keyValuePair: string[] = parentIdWithValue.trim().split(':');
    if(keyValuePair.length < 2) return false;
    const parentElement: ElementMeta = this.getElementById(keyValuePair[0]);
    if(!parentElement) return false;
    const currentParentValue = this.selectedFormGroupControl.controls[parentElement.elementId].value;
    return currentParentValue == keyValuePair[1];
  }

  isInvalidControl(controlName: string) {
    return this.selectedFormGroupControl.controls[controlName].invalid;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.formMetasMapSubscription.unsubscribe();
  }

  onSubmitForm() {
    this.resultMap = new Map<string, any>();
    const resultElementIds: string[] = Object.keys(this.selectedFormGroupControl.value);
    resultElementIds.forEach(eId => {
      const eMeta: ElementMeta = this.getElementById(eId);
      this.resultMap.set(eId, {label: eMeta.elementDisplayLabel, value: this.selectedFormGroupControl.value[eId]});
    });
    this.displayResult = true;
    console.log(this.resultMap);
  }

  getElementById(elementId: string): ElementMeta {
    if(!this.selectedFormMeta.elementsMeta) return undefined;
    for(let i=0; i<this.selectedFormMeta.elementsMeta.length; i++) {
      if(this.selectedFormMeta.elementsMeta[i].elementId == elementId) return this.selectedFormMeta.elementsMeta[i];
    }
    return undefined;
  }

}
