import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormMetaPairs } from '../model/form-meta-pairs.model';
import { AppStateService } from '../app-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forms-panel',
  templateUrl: './forms-panel.component.html',
  styleUrls: ['./forms-panel.component.css']
})
export class FormsPanelComponent implements OnInit, OnDestroy {

  formMetasMapFromService: Map<number, FormMetaPairs>;
  private formMetasMapSubscription: Subscription;

  constructor(private appStateService: AppStateService) {
    this.formMetasMapSubscription = this.appStateService.getFormMetasMap().subscribe(mapData => {
      this.formMetasMapFromService = mapData;
      console.log('yep');
    console.log(this.formMetasMapFromService);
    }, error => {
      console.log(error);
    });
    this.appStateService.triggerSubjectPush();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.formMetasMapSubscription.unsubscribe();
  }

}
