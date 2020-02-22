import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormMeta } from '../model/form-meta.object';
import { Subscription } from 'rxjs';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.css']
})
export class PreviewPanelComponent implements OnInit, OnDestroy {

  formMeta: FormMeta;
  private currentFormMetaSubscription: Subscription;

  constructor(private appStateService: AppStateService) { 
    this.currentFormMetaSubscription = this.appStateService
    .getCurrentFormMeta().subscribe(formMetaData => {
      this.formMeta = formMetaData;
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.currentFormMetaSubscription.unsubscribe();
  }
}
