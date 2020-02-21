import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.css']
})
export class EditorPanelComponent implements OnInit {

  
  formId: string = undefined;
  formDisplayLabel: string = undefined;

  consoleElementGroup: FormGroup = new FormGroup({
    'elementId': new FormControl(''),
    'elementDisplayLabel': new FormControl(''),
    'elementType': new FormControl(''),
    'elementDataType': new FormControl(''),
    'elementRequiredFlag': new FormControl(''),
    'elementActiveByDefaultFlag': new FormControl(''),
    'parentElementIds': new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitElement() {
    const elementMeta = this.consoleElementGroup.value;
    console.log(elementMeta);
    this.consoleElementGroup.reset();
  }

}
