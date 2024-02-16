import {Component, importProvidersFrom, Input, OnInit} from '@angular/core';
import {DistributionBuilderComponent} from "./distribution-builder/distribution-builder.component";
import {MetadataParserService} from "./services/metadata-parser.service";
import {DebeziumServerFormBase} from "./metadataModel/DebeziumServerFormBase";
import {FormGroup} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {MetadataHttpService} from "./services/metadata-http.service";
import {HttpClientModule} from "@angular/common/http";
import {MetadataObjectModel} from "./metadataModel/MetadataObjectModel";

@Component({
  selector: 'app-root',
  providers: [
    MetadataParserService,
    HttpClientModule
  ],
  standalone: true,
  imports: [
    DistributionBuilderComponent,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: `app.component.html`
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
