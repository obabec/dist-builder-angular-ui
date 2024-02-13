import {Component, importProvidersFrom, Input, OnInit} from '@angular/core';
import {DistributionBuilderComponent} from "./distribution-builder/distribution-builder.component";
import {MetadataParserService} from "./services/metadata-parser.service";
import {DebeziumServerFormBase} from "./metadataModel/DebeziumServerFormBase";
import {FormControl, FormGroup} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {MetadataHttpService} from "./services/metadata-http.service";
import {HttpClientModule} from "@angular/common/http";

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
  @Input() serverConfig!: DebeziumServerFormBase<any>;
  _form!: FormGroup;
  constructor(private service: MetadataParserService, private httpService: MetadataHttpService) { }

  ngOnInit(): void {
    this.serverConfig = new DebeziumServerFormBase<any>();
    //let x = this.httpService.getMetadataFromBackend().subscribe()
    this._form = this.service.parseMetadata(this.serverConfig);
    console.log("haha")
  }
}
