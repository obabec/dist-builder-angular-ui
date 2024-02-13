import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule, Form,
} from '@angular/forms';
import {MetadataParserService} from "../services/metadata-parser.service";
import {DebeziumServerFormBase} from "../metadataModel/DebeziumServerFormBase";
import {CommonModule} from "@angular/common";
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-distribution-builder',
  templateUrl: './distribution-builder.component.html',
  styleUrls: ['./distribution-builder.component.css'],
  providers: [MetadataParserService],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistributionBuilderComponent implements OnInit {
  @Input() _form!: FormGroup;
  @Input() serverConfig!: DebeziumServerFormBase<any>;
  document!: Document;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  ngOnInit(): void {
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
            if (groupEl.style.display !== 'none') {
              groupEl.style.display = 'none';
              if (group.parent != null) {
                let grp = this.getFormGroup(groupItem.label, group.parent as FormGroup);
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
      if (grp.style.display != 'block') {
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

  getFormDisplay(currentNode: DebeziumServerFormBase<any>): string {
    if (currentNode.type == 'class') {
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

  onSubmit(): string {
    return this._form.value;
  }
}
