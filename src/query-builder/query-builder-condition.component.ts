import {
  Component,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { QueryBuilderGroupComponent } from './query-builder-group.component';
import {
  Field,
  Condition,
  Group
} from './query-builder.interfaces';

@Component({
  selector: 'query-builder-condition',
  templateUrl: 'query-builder-condition.html',
  styles: ['.has-error { border-color: red; }']
})
export class QueryBuilderConditionComponent {

  selectedField: Field;

  @Input() parentGroup: QueryBuilderGroupComponent;

  @Input()
  get condition(): Condition { return this._condition; }
  set condition(value: Condition) {
    if (value !== this._condition) {
      this._condition = value;
    }
  };
  private _condition: Condition;

  @Output() conditionChange = new EventEmitter<Condition>();

  @Input() fields: Array<Field>;

  ngAfterContentInit() {
    this.selectedField = this.fields.find((f) => f.name == this.condition.field);
  }

  onFieldChange() {
    this.selectedField = this.fields.find((f) => f.name == this.condition.field);
    this.condition.operator = null;
    this.condition.value = null;
    this._emitChangeEvent();
  }

  onOperatorChange(event: Event) {
    this._emitChangeEvent();
  }

  onValueChange(event: Event) {
    this._emitChangeEvent();
  }

  onEnumValueChange(event: Event) {
    this._emitChangeEvent();
  }

  onBoolValueChange(event: Event) {
    this._emitChangeEvent();
  }

  removeCondition() {
    if (this.parentGroup) {
      let index: number = this.parentGroup.group.conditions.findIndex((c: Condition) => {
        return c.id === this.condition.id;
      });
      this.parentGroup.group.conditions.splice(index, 1);
      this._emitChangeEvent();
    }
  }

  canAddCondition(): boolean {
    if (this.parentGroup) {
      let index: number = this.parentGroup.group.conditions.findIndex((c: Condition) => {
        return c.id === this.condition.id;
      });
      return this.parentGroup.group.conditions.length === index + 1;
    } else {
      return false;
    }
  }

  _emitChangeEvent(): void {
    this.conditionChange.emit(this.condition);
  }
}