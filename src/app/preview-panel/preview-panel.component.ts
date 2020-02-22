import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.css']
})
export class PreviewPanelComponent implements OnInit {

  formMeta: {
    formId: string,
    formDisplayLabel: string,
    elementsMeta: {
      elementId: string,
      elementDisplayLabel: string,
      elementOptions: string[],
      elementType: string,
      elementDataType: string,
      elementRequiredFlag: boolean,
      elementActiveByDefaultFlag: boolean,
      parentElementIds: string[]
    }[]
  };

  constructor() { 
    this.formMeta = {
      formId: 'fid0001',
      formDisplayLabel: 'Sample Display Form',
      elementsMeta: [{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: ['one', 'two', 'three'],
        elementType: 'select',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      },{
        elementId: 'fhhe',
        elementDisplayLabel: 'Enter/Select the value (from) here: ',
        elementOptions: undefined,
        elementType: 'text',
        elementDataType: 'number',
        elementRequiredFlag: true,
        elementActiveByDefaultFlag: true,
        parentElementIds: ['f1', 'f2']
      }]
    };
  }

  ngOnInit(): void {
  }

}
