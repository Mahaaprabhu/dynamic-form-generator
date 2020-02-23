import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { EditorPanelComponent } from './editor-panel/editor-panel.component';
import { PreviewPanelComponent } from './preview-panel/preview-panel.component';
import { HomeComponent } from './home/home.component';
import { DynaRouterModule } from './dyna-router.module';
import { FormsPanelComponent } from './forms-panel/forms-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainContainerComponent,
    EditorPanelComponent,
    PreviewPanelComponent,
    HomeComponent,
    FormsPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DynaRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
