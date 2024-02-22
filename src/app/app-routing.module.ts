import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DistributionBuilderComponent} from "./distribution-builder/distribution-builder.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  {path: 'intro', component: MainPageComponent},
  {path: 'builder', component: DistributionBuilderComponent},
  { path: '',   redirectTo: 'intro', pathMatch: 'full' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true,
        anchorScrolling: "enabled"
      } // TODO: debug only!
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
