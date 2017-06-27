import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  Field,
  Operator,
  Condition,
  Group,
  Utils
} from './query-builder.interfaces';


@Component({
  selector: 'query-builder-group',
  templateUrl: 'query-builder-group.html'
})
export class QueryBuilderGroupComponent {

  @Input() fields: Array<Field>;
  @Input() operators: Array<Operator>;
  @Input() parentGroup: any;

  @Input()
  get group(): Group { return this._group; }
  set group(value: Group) {
    if (value !== this._group) {
      this._group = value;
      if (value.logicalOperator) {
        this.logicalOperator = value.logicalOperator;
      }
    }
  }
  private _group: Group;

  @Output() queryChange = new EventEmitter<Group>();

  _this: QueryBuilderGroupComponent;

  constructor() {
    this._this = this;
  }

  logicalOperator: Operator = 'and';

  onChangeLogicalOperators(event: Operator) {
    this.group.logicalOperator = this.logicalOperator;
    this._emitChangeEvent();
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
      let index: number = this.parentGroup.groups.findIndex((g: Group) => {
        return g.id === this.group.id;
      });
      this.parentGroup.groups.splice(index, 1);
      this._emitChangeEvent();
    }
  }

  conditionQueryChange(event: Condition): void {
    let index: number = this.group.conditions.findIndex((c: Condition) => {
      return c.id === event.id;
    });
    this.group.conditions[index] = event;
    this._emitChangeEvent();
  }

  _queryChange(group: Group): void {
    let i: number = this.group.groups.findIndex((g: Group) => {
      return g.id === group.id;
    });
    //this.group.groups[i] = event;
    this._emitChangeEvent();
  }

  _emitChangeEvent(): void {
    this.queryChange.emit(this.group);
  }
}