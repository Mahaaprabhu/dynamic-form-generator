import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormMetaPairs } from '../model/form-meta-pairs.model';
import { AppStateService } from '../app-state.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormMeta } from '../model/form-meta.object';

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
    const selectedFormId: number = Number(this.selectFormGroup.controls['selectedFormId'].value);
    this.selectedFormMeta = this.formMetasMapFromService.get(selectedFormId).formMeta;
    this.selectedFormGroupControl = this.formMetasMapFromService.get(selectedFormId).formGroupControl;
  }

  isInvalidControl(controlName: string) {
    console.log('ControlName: ', controlName)
    return this.selectedFormGroupControl.controls[controlName].invalid;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.formMetasMapSubscription.unsubscribe();
  }

  onSubmitForm() {
    console.log(this.selectedFormGroupControl);
  }

}
