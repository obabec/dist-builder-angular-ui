import {Dependency} from "./Dependency";

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
      // @ts-ignore
      c = c.prnt;
    }
    return level*100;
  }
}
