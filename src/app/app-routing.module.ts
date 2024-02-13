import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DistributionBuilderComponent} from "./distribution-builder/distribution-builder.component";

const routes: Routes = [
  {path: 'builder', component: DistributionBuilderComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: true} // TODO: debug only!
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
