import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
