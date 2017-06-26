import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Utils } from 'query-builder/query-builder.interfaces';

@Component({
  selector: 'query-builder-group',
  templateUrl: 'query-builder-group.html'
})
export class QueryBuilderGroupComponent {

  @Input() fields: any;
  @Input() operators: any;
  @Input() parentGroup: any;

  @Input()
  get group() { return this._group; }
  set group(value: any) {
    if (value !== this._group) {
      this._group = value;
      if (value.logicalOperator) {
        this.logicalOperator = value.logicalOperator;
      }
    }
  }
  private _group: any;

  @Output() queryChange = new EventEmitter<any>();

  _this: QueryBuilderGroupComponent;

  constructor() {
    this._this = this;
  }

  logicalOperator: string = 'and';

  onChangeLogicalOperators(event: any) {
    this._emitChangeEvent();
    this.group.logicalOperator = this.logicalOperator;
  }

  addCondition() {
    this.group.conditions.push({
      id: Utils.generateUUID(),
      field: '',
      operator: '',
      value: ''
    });
    this._emitChangeEvent();
  }

  addGroup() {
    this.group.groups.push({
      id: Utils.generateUUID(),
      logicalOperator: 'and',
      conditions: [{
        id: Utils.generateUUID(),
        field: '',
        operator: '',
        value: ''
      }],
      groups: []
    });
    this._emitChangeEvent();
  }

  removeGroup() {
    if (this.parentGroup) {
      let index: number = this.parentGroup.groups.findIndex((g: any) => {
        return g.id === this.group.id;
      });
      this.parentGroup.groups.splice(index, 1);
      this._emitChangeEvent();
    }
  }

  conditionQueryChange(event: any) {
    let index: number = this.group.conditions.findIndex((c: any) => {
      return c.id === event.id;
    });
    this.group.conditions[index] = event;
  }

  _emitChangeEvent(): void {
    this.queryChange.emit(this.group);
  }
}