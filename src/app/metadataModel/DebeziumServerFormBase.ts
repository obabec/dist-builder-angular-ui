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

import {Dependency} from "./Dependency";

/**
 * Mapping class. This class contains couple of attributes that are not currently used
 * but might be used in the future with implementing FormControls.
 */
export class DebeziumServerFormBase<T> {
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  variants: {key: string, value: string}[];
  options: DebeziumServerFormBase<any>[];
  children: DebeziumServerFormBase<any>[];
  prnt: DebeziumServerFormBase<any> | null;
  dependencyList: Dependency[] | null;
  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    variants?: {key: string, value: string}[];
    options?: DebeziumServerFormBase<any>[];
    children? : DebeziumServerFormBase<any>[];
    prnt? : DebeziumServerFormBase<any> | null;
    dependencyList?: Dependency[] | null;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.variants = options.variants || [];
    this.options = options.options || [];
    this.children = options.children || [];
    this.prnt = options.prnt || null;
    this.dependencyList = options.dependencyList || null;
  }

  public getTreeLevel() {
    let level = 0;
    let c = this.prnt;
    while (c != null) {
      level++;
      c = c.prnt;
    }
    return level;
  }

}
