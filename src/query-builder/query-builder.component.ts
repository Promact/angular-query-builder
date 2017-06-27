import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Field,
  Condition,
  Group
} from './query-builder.interfaces';


@Component({
  selector: 'query-builder',
  templateUrl: 'query-builder.html'
})
export class QueryBuilderComponent {

  @Input()
  get query() { return this._query; }
  set query(value: any) {
    this._query = value || {
      logicalOperator: 'and',
      conditions: [],
      groups: []
    };
  }
  private _query: any = {
    logicalOperator: 'and',
    conditions: [],
    groups: []
  };
  @Input() fields: any;
  @Input() operators: any;

  @Output() queryChange = new EventEmitter<any>();

  _queryChange(group: any): void {
    this.queryChange.emit(group);
  }
}