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

  consoleElementGroup: FormGroup;
  private elementCountTracker: number = 1;
  private formMeta: FormMeta;
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

    console.log(this.consoleElementGroup.controls['elementDisplayLabel'].invalid);
    if(this.consoleElementGroup.invalid) {
      return;
    }
    console.log(this.consoleElementGroup);
    console.log(this.formMeta);
    
    const elementMeta: ElementMeta = {
      elementOrder: this.formMeta && this.formMeta.elementsMeta
                    ? this.formMeta.elementsMeta.length + 1 : 1,
      elementId: this.getNextElementIdAndIncrement(),
      elementDisplayLabel: this.consoleElementGroup.value['elementDisplayLabel'] || 'Enter Something(?): ',
      elementOptions: this.consoleElementGroup.value['elementOptions'].replace(/ /g, '').split(','),
      elementType: this.consoleElementGroup.value['elementType'] || 'text',
      elementDataType: this.consoleElementGroup.value['elementDataType'],
      elementRequiredFlag: this.consoleElementGroup.value['elementRequiredFlag'],
      parentElementIds: this.consoleElementGroup.value['parentElementIds'].replace(/ /g, '').split(',')
    }

    this.appStateService.addElementMetaToCurrentForm(this.formId, this.formDisplayLabel, elementMeta);
    
    console.log(elementMeta);
    this.consoleElementGroup.reset();
    this.setElementFormGroup();
  }

  private setElementFormGroup() {
    this.consoleElementGroup = new FormGroup({
      'elementId': new FormControl({value: this.getNextElementId(), disabled: true}),
      'elementDisplayLabel': new FormControl('', [Validators.required]),
      'elementOptions': new FormControl(''),
      'elementType': new FormControl(''),
      'elementDataType': new FormControl(''),
      'elementRequiredFlag': new FormControl(''),
      'elementActiveByDefaultFlag': new FormControl(''),
      'parentElementIds': new FormControl('')
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
  }
}

