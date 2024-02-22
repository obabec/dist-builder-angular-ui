import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MetadataObjectModel} from "../metadataModel/MetadataObjectModel";
import {DebeziumServerFormBase} from "../metadataModel/DebeziumServerFormBase";
import {MetadataHttpService} from "./metadata-http.service";
import {Dependency} from "../metadataModel/Dependency";


@Injectable({
  providedIn: 'root'
})
export class MetadataParserService {

  parseMetadata(parent: DebeziumServerFormBase<any>, metadata: MetadataObjectModel) {
    let group = this.parseObject(metadata, parent, false) as FormGroup;
    return group;
  }

  parseObject(object: MetadataObjectModel, parent: DebeziumServerFormBase<any>, option: boolean): FormGroup | FormControl | FormArray {
    let group: FormGroup = new FormGroup<any>({});
    if (object.type === "interface") {
      console.debug("Parsing interface")
      let obj = new DebeziumServerFormBase();
      obj.type = object.type;
      obj.label = object.name;
      obj.key = object.name;
      obj.prnt = parent;
      for (let j = 0; j < object.options.length; j++) {
        let newGroup = this.parseObject(object.options[j], obj, true)
        if (j != 0) {
          newGroup.disable();
        }
        group.addControl(object.options[j].name, newGroup);
      }
      parent.children.push(obj);
      return group;
    }

     if (object.type === "enum") {
      console.debug("Parsing enumeration");
      let obj = this.parseEnum(object, parent);
      let control: FormControl = new FormControl(obj.value || '', );
      parent.children.push(obj);
      return control;

    } else if (object.type === "class") {
       console.debug("Debugging class");
       let node: DebeziumServerFormBase<any>;
       if (parent.key == "") {
         node = parent;
       } else {
         node = new DebeziumServerFormBase();
         node.prnt = parent;
         if (option) {
           parent.options.push(node)
         } else {
           parent.children.push(node);
         }
       }
       node.key = object.clazz;
       node.type = object.type;
       node.label = object.name;

       console.debug("Parsing class fields")
       object.fields.forEach(field => {
         console.debug("Now parsing field: " + field.name + " of class: " + object.name);
         let control = this.parseObject(field, node, false);
         group.addControl(field.name, control);
       })

       return group;

     } else if (object.type === 'DependencyList') {
       console.debug("Parsing dependency list")
       let dependencyList = new DebeziumServerFormBase();
       dependencyList.type = "DependencyList";
       dependencyList.label = "dependencyList";
       dependencyList.dependencyList = [];
       parent.children.push(dependencyList);
       dependencyList.prnt = parent;

       return new FormArray<any>([]);

     } else {
      console.debug("Parsing standard property like string, int, and others")
      let obj = this.parseProperty(object, parent)
      let control: FormControl = new FormControl(obj.value || '');
      parent.children.push(obj);
      return control;
    }
  }

  parseProperty(prop: MetadataObjectModel, parent: DebeziumServerFormBase<any>) {
    let cntp = "";
    if (prop.type.includes("Integer")) {
      cntp = "number"
    } else if (prop.type.includes("Boolean")) {
      cntp = "checkbox"
    } else {
      cntp = "text"
    }

    let tgProp = new DebeziumServerFormBase({
      label: prop.name,
      key: prop.name,
      type: prop.type,
      controlType: cntp,
    })
    tgProp.prnt = parent;
    return tgProp
  }

  parseEnum(en: MetadataObjectModel, parent: DebeziumServerFormBase<string>) {
    let tgEn = new DebeziumServerFormBase<string>({
      label: en.name,
      key: en.name,
      type: en.type,
      controlType: 'dropdown'
    })
    en.variants.forEach(variant => {
      tgEn.variants.push({
        key: variant,
        value: variant,
      })
    })
    tgEn.prnt = parent;
    return tgEn;
  }
}
