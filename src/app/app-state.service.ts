import { Injectable } from '@angular/core';
import { FormMeta } from './model/form-meta.object';
import { Subject, Observable } from 'rxjs';
import { ElementMeta } from './model/element-meta.model';
import { FormGroup } from '@angular/forms';
import { FormMetaPairs } from './model/form-meta-pairs.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private currentFormMeta: FormMeta = undefined;
  private formMetasMap: Map<number, FormMetaPairs> = new Map<number, FormMetaPairs>();

  private formMetasSubject: Subject<FormMeta> = new Subject<FormMeta>();
  private formMetasMapSubject: Subject<Map<number, FormMetaPairs>> = new Subject<Map<number, FormMetaPairs>>();

  constructor() { }

  addFormMeta(formMeta: FormMeta, formGroupControl: FormGroup) {
    this.formMetasMap.set(formMeta.formId, {formMeta, formGroupControl});
    this.formMetasMapSubject.next(this.formMetasMap);
    this.resetFormMeta();
  }

  addElementMetaToCurrentForm(formId: number, formDisplayLabel: string, elementMeta: ElementMeta) {
    if(!this.currentFormMeta) this.currentFormMeta = new FormMeta();
    this.currentFormMeta.formId = formId;
    this.currentFormMeta.formDisplayLabel = formDisplayLabel;
    if(elementMeta && !this.currentFormMeta.elementsMeta) this.currentFormMeta.elementsMeta = [];
    if(elementMeta) this.currentFormMeta.elementsMeta.push(elementMeta);
    this.formMetasSubject.next(this.currentFormMeta);
  }

  resetFormMeta() {
    this.currentFormMeta = undefined;
    this.formMetasSubject.next(this.currentFormMeta);
  }

  getCurrentFormMeta(): Observable<FormMeta> {
    return this.formMetasSubject.asObservable();
  }

  triggerSubjectPush() {
    this.formMetasMapSubject.next(this.formMetasMap);
  }

  getFormMetasMap() : Observable<Map<number, FormMetaPairs>> {
    return this.formMetasMapSubject.asObservable();
  }

  getAMockSampleFormMeta(): FormMeta {
    const jsonSampleForm: string = `
    {
      "formId": 1582636450869,
      "formDisplayLabel": "Ticket Tracker (Sample Form)",
      "elementsMeta": [
        {
          "elementOrder": 1,
          "elementId": "e1",
          "elementDisplayLabel": "CreatedBy:",
          "elementOptions": [
            ""
          ],
          "elementType": "text",
          "regExPattern": ".*",
          "elementRequiredFlag": "true",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": ""
        },
        {
          "elementOrder": 2,
          "elementId": "e2",
          "elementDisplayLabel": "Description:",
          "elementOptions": [
            ""
          ],
          "elementType": "text",
          "regExPattern": ".*",
          "elementRequiredFlag": "true",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": ""
        },
        {
          "elementOrder": 3,
          "elementId": "e3",
          "elementDisplayLabel": "Severity:",
          "elementOptions": [
            ""
          ],
          "elementType": "text",
          "regExPattern": "[0-9]*",
          "elementRequiredFlag": "true",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": ""
        },
        {
          "elementOrder": 4,
          "elementId": "e4",
          "elementDisplayLabel": "Status:",
          "elementOptions": [
            "CANCELLED",
            "COMPLETED"
          ],
          "elementType": "select",
          "regExPattern": ".*",
          "elementRequiredFlag": "true",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": ""
        },
        {
          "elementOrder": 5,
          "elementId": "e5",
          "elementDisplayLabel": "CancelledReason:",
          "elementOptions": [
            "ENDUSER",
            "OTHERS"
          ],
          "elementType": "select",
          "regExPattern": ".*",
          "elementRequiredFlag": "",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": "e4:CANCELLED"
        },
        {
          "elementOrder": 6,
          "elementId": "e6",
          "elementDisplayLabel": "CancelledOtherDescription:",
          "elementOptions": [
            ""
          ],
          "elementType": "text",
          "regExPattern": ".*",
          "elementRequiredFlag": "",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": "e5:OTHERS"
        },
        {
          "elementOrder": 7,
          "elementId": "e7",
          "elementDisplayLabel": "Comments:",
          "elementOptions": [
            ""
          ],
          "elementType": "text",
          "regExPattern": ".*",
          "elementRequiredFlag": "",
          "allParentElementIds": [],
          "anyParentElementIds": [],
          "parentElementWithValue": "e4:COMPLETED"
        }
      ]
    }
    `;

    return JSON.parse(jsonSampleForm);
  }

}
