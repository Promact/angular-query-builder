import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Field,
  Operator,
  Condition,
  Group,
  Query,
  Utils
} from './query-builder.interfaces';


@Component({
  selector: 'query-builder',
  templateUrl: 'query-builder.html'
})
export class QueryBuilderComponent {

  @Input()
  get query(): Query { return this._query; }
  set query(value: Query) {
    this._query = value || {
      id: '1',
      logicalOperator: 'and',
      conditions: [],
      groups: []
    };
  }
  private _query: Query = {
    id: '1',
    logicalOperator: 'and',
    conditions: [],
    groups: []
  };
  @Input() fields: Field;
  @Input() operators: Array<Operator>;

  @Output() queryChange = new EventEmitter<Query>();
  @Output() queryString = new EventEmitter<string>();

  _queryChange(group: Query): void {
    this.queryChange.emit(group);
    this.queryString.emit(Utils.computed(group));
  }
}