import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppStateService } from '../app-state.service';
import { ElementMeta } from '../model/element-meta.model';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.css']
})
export class EditorPanelComponent implements OnInit {


  formId: string = undefined;
  formDisplayLabel: string = undefined;

  consoleElementGroup: FormGroup;

  constructor(private appStateService: AppStateService) {
    this.setElementFormGroup();
  }

  ngOnInit(): void {
  }

  onSubmitElement() {

    const elementMeta: ElementMeta = {
      elementOrder: this.consoleElementGroup.value['elementOrder'],
      elementId: this.consoleElementGroup.value['elementId'],
      elementDisplayLabel: this.consoleElementGroup.value['elementDisplayLabel'],
      elementOptions: this.consoleElementGroup.value['elementOptions'].replace(/ /g, '').split(','),
      elementType: this.consoleElementGroup.value['elementType'],
      elementDataType: this.consoleElementGroup.value['elementDataType'],
      elementRequiredFlag: this.consoleElementGroup.value['elementRequiredFlag'],
      elementActiveByDefaultFlag: this.consoleElementGroup.value['elementActiveByDefaultFlag'],
      parentElementIds: this.consoleElementGroup.value['parentElementIds'].replace(/ /g, '').split(',')
    }

    this.appStateService.addElementMetaToCurrentForm(this.formId, this.formDisplayLabel, elementMeta);
    
    console.log(elementMeta);
    this.consoleElementGroup.reset();
    this.setElementFormGroup();
  }

  private setElementFormGroup() {
    this.consoleElementGroup = new FormGroup({
      'elementId': new FormControl(''),
      'elementDisplayLabel': new FormControl(''),
      'elementOptions': new FormControl(''),
      'elementType': new FormControl(''),
      'elementDataType': new FormControl(''),
      'elementRequiredFlag': new FormControl(''),
      'elementActiveByDefaultFlag': new FormControl(''),
      'parentElementIds': new FormControl('')
    })
  }

}
