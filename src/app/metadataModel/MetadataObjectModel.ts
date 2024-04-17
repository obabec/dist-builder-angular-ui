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

export class MetadataObjectModel {
  private _name: string;
  private _type: string;
  private _clazz: string;
  private _fields: MetadataObjectModel[];
  private _options: MetadataObjectModel[];
  private _variants: string[];

  private _selected: Boolean;
  private _value: string;


  constructor(name: string, type: string, clazz: string, fields: MetadataObjectModel[], options: MetadataObjectModel[], variants: string[], selected: Boolean, value: string) {
    this._name = name;
    this._type = type;
    this._clazz = clazz;
    this._fields = fields;
    this._options = options;
    this._variants = variants;
    this._selected = selected;
    this._value = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get clazz(): string {
    return this._clazz;
  }

  set clazz(value: string) {
    this._clazz = value;
  }

  get fields(): MetadataObjectModel[] {
    return this._fields;
  }

  set fields(value: MetadataObjectModel[]) {
    this._fields = value;
  }

  get options(): MetadataObjectModel[] {
    return this._options;
  }

  set options(value: MetadataObjectModel[]) {
    this._options = value;
  }

  get variants(): string[] {
    return this._variants;
  }

  set variants(value: string[]) {
    this._variants = value;
  }

  get selected(): Boolean {
    return this._selected;
  }

  set selected(value: Boolean) {
    this._selected = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  getVariantOption() {
    let varOptions: {key: string, value: string}[] = [];
    this._variants.forEach(val => {
      varOptions.push({key: val, value: val});
    })
    return varOptions;
  }
}

export class Option {
  key: String;
  value: String;


  constructor(key: String, value: String) {
    this.key = key;
    this.value = value;
  }
}


