/*
 * MIT License
 *
 * Copyright (c) [2024] [Ondrej Babec <ond.babec@gmail.com>]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE
 * ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MetadataObjectModel} from "../metadataModel/MetadataObjectModel";
import {DebeziumServerFormBase} from "../metadataModel/DebeziumServerFormBase";


@Injectable({
  providedIn: 'root'
})
export class MetadataParserService {

  /**
   * Parses the metadata from API and returns completed FormGroup. It also modifies the parent object.
   * @param parent Empty object that will be modified during the process.
   * @param metadata
   */
  parseMetadata(parent: DebeziumServerFormBase<any>, metadata: MetadataObjectModel) {
    let group = this.parseObject(metadata, parent, false) as FormGroup;
    return group;
  }

  /**
   * This method is recursively called to parse every object from metadata. For each object it
   * completes the DebeziumServerFormBase object and also specific FormGroup, FormArray or FormControl. These are than
   * added to parent DebeziumServerFormBase or Form component.
   * @param object object to parse
   * @param parent parent metadata object
   * @param option true if parsing specific interface implementation
   */
  parseObject(object: MetadataObjectModel, parent: DebeziumServerFormBase<any>, option: boolean): FormGroup | FormControl | FormArray {
    let group: FormGroup = new FormGroup<any>({});
    if (object.type === "interface") {
      console.trace("Parsing interface")
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
    // Parsing implementation
     if (object.type === "enum") {
      console.trace("Parsing enumeration");
      let obj = this.parseEnum(object, parent);
      let control: FormControl = new FormControl(obj.value || '', );
      parent.children.push(obj);
      return control;
    // Parsing specific class
    } else if (object.type === "class") {
       console.trace("Debugging class");
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

       console.trace("Parsing class fields")
       object.fields.forEach(field => {
         console.trace("Now parsing field: " + field.name + " of class: " + object.name);
         let control = this.parseObject(field, node, false);
         group.addControl(field.name, control);
       })

       return group;
      // Parsing the dependency list
     } else if (object.type === 'DependencyList') {
       console.trace("Parsing dependency list")
       let dependencyList = new DebeziumServerFormBase();
       dependencyList.type = "DependencyList";
       dependencyList.label = "dependencyList";
       dependencyList.dependencyList = [];
       parent.children.push(dependencyList);
       dependencyList.prnt = parent;

       return new FormArray<any>([]);

     } else {
      console.trace("Parsing standard property like string, int, and others")
      let obj = this.parseProperty(object, parent)
      let control: FormControl = new FormControl(obj.value || '');
      parent.children.push(obj);
      return control;
    }
  }

  // Parsing specific attribute besides the Enum
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

  // Parsing enumerations
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
