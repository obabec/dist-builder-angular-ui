import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule, Form, FormArray, FormControl,
} from '@angular/forms';
import {MetadataParserService} from "../services/metadata-parser.service";
import {DebeziumServerFormBase} from "../metadataModel/DebeziumServerFormBase";
import {CommonModule} from "@angular/common";
import { DOCUMENT } from '@angular/common';
import {Dependency} from "../metadataModel/Dependency";
import {MetadataHttpService} from "../services/metadata-http.service";
import {saveAs} from "file-saver";
@Component({
  selector: 'app-distribution-builder',
  templateUrl: './distribution-builder.component.html',
  styleUrls: ['./distribution-builder.component.css'],
  providers: [MetadataParserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistributionBuilderComponent implements OnInit {
  _form!: FormGroup;
  serverConfig!: DebeziumServerFormBase<any>;
  dependencyList!: DebeziumServerFormBase<any>;
  ready: boolean = false;
  document!: Document;
  keyStore!: File;
  trustStore!: File;

  constructor(@Inject(DOCUMENT) document: Document, private httpService: MetadataHttpService, private parserService: MetadataParserService, private cdRef: ChangeDetectorRef) {
    this.document = document;
  }

  ngOnInit(): void {
    this.serverConfig = new DebeziumServerFormBase<any>();
    this._form = new FormGroup<any>({});

    this.httpService.getMetadataFromBackend().then(value => {
      this._form = this.parserService.parseMetadata(this.serverConfig, value);
      this.dependencyList = this.serverConfig.children[4];
      this.ready = true;
      this.cdRef.detectChanges();
      let haha = 5;
    }).catch(() => {
      console.log("ERROROROROR")
    });

    this.dependencyList = this.serverConfig.children[4];
    console.log("Initialising builder UI")
  }

  getFormGroup(name: string, group: FormGroup): FormGroup {
    let tempGroup = group.get(name);
    if (tempGroup === null) {
      tempGroup = group.parent?.get(name) as FormGroup;
    }
    return tempGroup as FormGroup;
  }

  disableOtherImplementations(group: FormGroup, groupItem: DebeziumServerFormBase<any>) {
    if (groupItem.prnt != undefined) {
      for (let option of groupItem.prnt.options) {
        if (option !== groupItem) {
          let groupEl = document.getElementById(this.getUniqueId(option));
          if (groupEl != null) {
            if (groupEl.style.display !== 'none' || this.getFormGroup(option.label, group.parent as FormGroup).enabled) {
              groupEl.style.display = 'none';
              if (group.parent != null) {
                let grp = this.getFormGroup(option.label, group.parent as FormGroup);
                grp.disable();
              }
            }
          }
        }
      }
    }
  }

  disableAllOptionInGroup(parentGroup: FormGroup, parentInterface: DebeziumServerFormBase<any>) {
    for (let option of parentInterface.options) {
      let groupEl = document.getElementById(this.getUniqueId(option));
      let group = this.getFormGroup(option.label, parentGroup);
      if (groupEl != null) {
          groupEl.style.display = 'none';
          group.disable();
        }
    }
  }

  disableGroupIfNotExplicit(object: DebeziumServerFormBase<any>, group: FormGroup) {
    let grp = document.getElementById(this.getUniqueId(object));
    if (grp != undefined) {
      if (grp.style.display != 'block' && group.disabled) {
        group.disable();
      }
    }
  }

  changeButtonText(buttonId: string) {
    let button = document.getElementById(buttonId);
    if (button != undefined) {
      if (button.innerText === "Enable") {
        button.innerText = "Disable";
      } else {
        button.innerText = "Enable";
      }
    }
  }

  getDependencyMatrix() {
    let dependencyMatrix = [];
    if (this.dependencyList.dependencyList != undefined) {
      for (let i = 0; i < this.dependencyList.dependencyList.length; i = i + 3) {
        let arr = this.dependencyList.dependencyList.slice(i, i + 3)
        dependencyMatrix.push(arr);
      }
    }
    return dependencyMatrix;
  }

  getDependencyArray(group: FormGroup): FormArray {
    return group.get("dependencyList") as FormArray
  }

  getDependencyIndex(dependency: Dependency): number {
    if (this.dependencyList.dependencyList != undefined) {
      for (let i = 0; i < this.dependencyList.dependencyList.length; i++) {
        if (this.dependencyList.dependencyList[i].id === dependency.id) {
          return i;
        }
      }
    }
    return 0;
  }

  getDependencyArrayGroup(group: FormGroup, index: number): FormGroup {
    return this.getDependencyArray(group).at(index) as FormGroup;
  }

  removeDependency(group: FormGroup, index: number, item: Dependency) {
    if (this.dependencyList.dependencyList != undefined) {
      this.dependencyList.dependencyList.splice(index, 1)
      this.getDependencyArray(group).removeAt(index);
    }
  }

  addDependency(group: FormGroup, groupItem: DebeziumServerFormBase<any>) {
    let id = Date.now().toString(36);
    let dependency = new Dependency(id, "", "", "", "");
    if (groupItem.dependencyList == undefined) {
        groupItem.dependencyList = []
    }
    groupItem.dependencyList.push(dependency);
    let grp = new FormGroup({
      groupId: new FormControl(),
      artifactId: new FormControl(),
      version: new FormControl(),
      comment: new FormControl()
    })
    this.getDependencyArray(group).push(grp)
    let asdasd: 4;
  }

  hideUnhide(group: FormGroup, groupItem: DebeziumServerFormBase<any>) {
    let groupEl = document.getElementById(this.getUniqueId(groupItem));
    this.disableOtherImplementations(group, groupItem);
    if (groupEl != null) {
      if (groupEl.style.display === 'none') {
        groupEl.style.display = 'block';
        group.enable();
      } else {
        groupEl.style.display = 'none';
        group.disable();
      }
    }
  }

  getFormDisplay(currentNode: DebeziumServerFormBase<any>, group: FormGroup): string {
    if (currentNode.type == 'class' && group.disabled) {
      return "none";
    } else {
      return "block";
    }
  }

  getUniqueId(object: DebeziumServerFormBase<any>): string {
    let id = "";

    let obj = object;

    while (obj.prnt != null) {
      if (id === "") {
        id = obj.label;
      } else {
        id = obj.label + "-" + id;
      }
      obj = obj.prnt;
    }


    return  id;
  }

  getTitle(object: DebeziumServerFormBase<any>): string {
    let titlesec = object.label.split(/(?=[A-Z])/);
    let title = ""
    for (let word of titlesec) {
      if (title.length === 0) {
        title = word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        title = title + " " + word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
    return title;
  }

  isSelected(parentGroup: FormGroup, option: DebeziumServerFormBase<any>): boolean {
    let targetGroup = this.getFormGroup(option.label, parentGroup);
    return targetGroup.enabled;
  }

  onSelectChange(formGroup: FormGroup, parent: DebeziumServerFormBase<any>, targetLabel: any): void {
    let label = targetLabel.target.value;
    if (label != undefined) {
      if (label === "") {
        this.disableAllOptionInGroup(formGroup, parent)
      }
      let grp = this.getFormGroup(label, formGroup);
      let target: any = undefined;
      for (let option of parent.options) {
        if (option.label === label) {
          target = option;
        }
      }
      if (target !== undefined) {
        this.hideUnhide(grp, target as DebeziumServerFormBase<any>)
      }
    }
  }

  onKeystoreChange(event: any) {
    const files = event.target.files;
    if (files.length) {
      //this.status = "initial";
      this.keyStore = files[0];
    }
  }

  onTruststoreChange(event: any) {
    const files = event.target.files;
    if (files.length) {
      //this.status = "initial";
      this.trustStore = files[0];
    }
  }

  onSubmit() {
    let formData = new FormData()
    formData.append('distribution', JSON.stringify(this._form.value));
    if (this.trustStore != undefined) {
      formData.append('truststore', this.trustStore, 'truststore.jks');
    }
    if (this.keyStore != undefined) {
      formData.append('keystore', this.keyStore, 'keystore.jks');
    }
    this.httpService.postForm(formData).then(response => {
      saveAs(response as Blob, 'distribution.zip')
    }).catch(err => {
      console.log("Problema " + err.toString())
    })
  }

  protected readonly console = console;
}
