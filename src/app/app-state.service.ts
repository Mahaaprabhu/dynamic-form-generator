import { Injectable } from '@angular/core';
import { FormMeta } from './model/form-meta.object';
import { Subject, Observable } from 'rxjs';
import { ElementMeta } from './model/element-meta.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private currentFormMeta: FormMeta = undefined;
  private formMetasMap: Map<number, {formMeta: FormMeta, formGroupControl: FormGroup}> 
              = new Map<number, {formMeta: FormMeta, formGroupControl: FormGroup}>();
  private formMetasSubject: Subject<FormMeta> = new Subject<FormMeta>();

  constructor() { }

  addFormMeta(formMeta: FormMeta, formGroupControl: FormGroup) {
    this.formMetasMap.set(formMeta.formId, {formMeta, formGroupControl});
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
    this.addFormMeta = undefined;
  }

  getCurrentFormMeta(): Observable<FormMeta> {
    return this.formMetasSubject.asObservable();
  }

}
