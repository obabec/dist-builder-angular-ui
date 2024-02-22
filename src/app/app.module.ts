import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {MainPageComponent} from "./main-page/main-page.component";
import {DistributionBuilderComponent} from "./distribution-builder/distribution-builder.component";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    FormsModule,
    AppRoutingModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    DistributionBuilderComponent,
  ],
  exports: [
    MainPageComponent,
    DistributionBuilderComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
