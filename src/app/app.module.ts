import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { EmployeeService, UserDirectoryKeywordSearchService, CountriesKeywordSearchService } from './models';
import { SpPnpjsUtilityModule } from 'sp-pnpjs-utility';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './core/rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,  PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    ClarityModule.forRoot(),
    SpPnpjsUtilityModule.forRoot(),
    UiModule
  ],
  providers: [EmployeeService, UserDirectoryKeywordSearchService, CountriesKeywordSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
