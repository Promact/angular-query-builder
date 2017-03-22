 
export interface IQueryBuilderComponent{
    getOutput(): string;
}

export interface ListItem {
  id: any;
  name: string;
} 

export interface Rule {
  condition?: ListItem;
  field?: ListItem;
  data?: any;
  group?: Group;
}

export interface Group {
  groupId: string;
  rules: Array<Rule>;
  operator: ListItem;
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