//Misc interfaces and classes used in the Query Builder

export interface IQueryBuilderComponent {
  getOutput(): string;
}

export type Type = 'text' | 'number' | 'date' | 'boolean' | 'enum';
export type Operator = string;

export interface Enum {
  text: string;
  value: any;
}

export interface Field {
  name: string;
  operators: Array<Operator>;
  type: string;
  enum?: Array<Enum>;
}

export interface Condition {
  id: string;
  field: string;
  operator: Operator;
  value: string;
}

export interface Group {
  id: string;
  logicalOperator: Operator;
  conditions: Array<Condition>;
  groups: Array<Group>;
}

export interface Query {
  id: string;
  logicalOperator: Operator;
  conditions: Array<Condition>;
  groups: Array<Group>;
}

export interface Filter {
  group: Group;
}

export class Utils {
  static generateUUID(): string { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  static isNull(obj: any): boolean {
    return (typeof obj === 'undefined' || obj === null);
  }

  static isBlankString(s: any): boolean {
    return (this.isNull(s) || s === '');
  }

}