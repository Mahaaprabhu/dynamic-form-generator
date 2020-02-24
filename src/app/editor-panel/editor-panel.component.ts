import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppStateService } from '../app-state.service';
import { ElementMeta } from '../model/element-meta.model';
import { FormMeta } from '../model/form-meta.object';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.css']
})
export class EditorPanelComponent implements OnInit, OnDestroy {


  formId: number = Date.now();
  formDisplayLabel: string = undefined;
  formMeta: FormMeta;

  consoleElementGroup: FormGroup;
  private elementCountTracker: number = 1;
  private currentFormMetaSubscription: Subscription;
  
  constructor(private appStateService: AppStateService) {
    this.setElementFormGroup();
    this.currentFormMetaSubscription = this.appStateService
    .getCurrentFormMeta().subscribe(formMetaData => {
      this.formMeta = formMetaData;
    });
  }

  ngOnInit(): void {
  }

  onSubmitElement() {

    if(this.consoleElementGroup.invalid) {
      return;
    } 
    const elementMeta: ElementMeta = {
      elementOrder: this.formMeta && this.formMeta.elementsMeta
                    ? this.formMeta.elementsMeta.length + 1 : 1,
      elementId: this.getNextElementIdAndIncrement(),
      elementDisplayLabel: this.consoleElementGroup.value['elementDisplayLabel'] || 'Enter Something(?): ',
      elementOptions: this.consoleElementGroup.value['elementOptions'].replace(/ /g, '').split(','),
      elementType: this.consoleElementGroup.value['elementType'] || 'text',
      regExPattern: this.consoleElementGroup.value['regExPattern'] || '.*',
      elementRequiredFlag: this.consoleElementGroup.value['elementRequiredFlag'],
      allParentElementIds: this.consoleElementGroup.value['allParentElementIds'].replace(/ /g, '').split(','),
      anyParentElementIds: this.consoleElementGroup.value['anyParentElementIds'].replace(/ /g, '').split(',')
    }
    //filter out empty array elements
    elementMeta.allParentElementIds = elementMeta.allParentElementIds.filter(el => el && true);
    elementMeta.anyParentElementIds = elementMeta.anyParentElementIds.filter(el => el && true);
    this.appStateService.addElementMetaToCurrentForm(this.formId, this.formDisplayLabel, elementMeta); 
    this.consoleElementGroup.reset();
    this.setElementFormGroup();
  }

  onSubmitForm() {
    const formGroup: FormGroup = this.generateFormGroupControlFromMetaData(this.formMeta);
    this.appStateService.addFormMeta(this.formMeta, formGroup);
    this.formId = Date.now();
    this.formDisplayLabel = undefined;
  }

  private generateFormGroupControlFromMetaData(formMetaData: FormMeta): FormGroup {
    const formGroup: FormGroup = new FormGroup({});
    formMetaData.elementsMeta.forEach(elementMeta => {
      formGroup.registerControl(
        elementMeta.elementId, this.generateFormControlFromMetaData(elementMeta)
      );
    });
    return formGroup;
  }

  private generateFormControlFromMetaData(elementMeta: ElementMeta): FormControl {
    const fomrControl = new FormControl(
      '',
      elementMeta.elementRequiredFlag
      ? [ Validators.pattern(elementMeta.regExPattern), Validators.required ]
      : [ Validators.pattern(elementMeta.regExPattern) ]
    );
    return fomrControl;
  }

  private setElementFormGroup() {
    this.consoleElementGroup = new FormGroup({
      'elementId': new FormControl({value: this.getNextElementId(), disabled: true}),
      'elementDisplayLabel': new FormControl('', [Validators.required]),
      'elementOptions': new FormControl(''),
      'elementType': new FormControl(''),
      'regExPattern': new FormControl(''),
      'elementRequiredFlag': new FormControl(''),
      'elementActiveByDefaultFlag': new FormControl(''),
      'allParentElementIds': new FormControl(''),
      'anyParentElementIds': new FormControl('')
    })
  }

  getNextElementId() :string {
    return 'e'+this.elementCountTracker;
  }

  getNextElementIdAndIncrement () :string {
    const eId: string = this.getNextElementId();
    this.elementCountTracker++;
    return eId;
  }

  ngOnDestroy(): void {
    this.currentFormMetaSubscription.unsubscribe();
    this.appStateService.resetFormMeta();
  }
}

