import { Injectable } from '@angular/core';
import { FormMeta } from './model/form-meta.object';
import { Subject, Observable } from 'rxjs';
import { ElementMeta } from './model/element-meta.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private currentFormMeta: FormMeta = undefined;
  private formMetasMap: Map<number, FormMeta> = new Map<number, FormMeta>();
  private formMetasSubject: Subject<FormMeta> = new Subject<FormMeta>();

  constructor() { }

  addFormMeta(formMeta: FormMeta) {
    this.formMetasMap.set(formMeta.formId, formMeta);
  }

  addElementMetaToCurrentForm(formId: number, formDisplayLabel: string, elementMeta: ElementMeta) {
    if(!this.currentFormMeta) this.currentFormMeta = new FormMeta();
    this.currentFormMeta.formId = formId;
    this.currentFormMeta.formDisplayLabel = formDisplayLabel;

    if(elementMeta && !this.currentFormMeta.elementsMeta) this.currentFormMeta.elementsMeta = [];
    if(elementMeta) this.currentFormMeta.elementsMeta.push(elementMeta);
    this.formMetasSubject.next(this.currentFormMeta);
  }

  getCurrentFormMeta(): Observable<FormMeta> {
    return this.formMetasSubject.asObservable();
  }

}
