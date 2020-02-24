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

}
