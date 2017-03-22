import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import QueryBuilderGroupComponent from './query-builder-group.component';
import { Filter, ListItem, Utils, Rule, Group } from "query-builder/query-builder.interfaces";

@Component({
    selector: 'query-builder',
    templateUrl: 'query-builder.html',
    providers: []
})
export default class QueryBuilderComponent {

    @ViewChild('queryBuilderGroup') queryBuilderGroup: QueryBuilderGroupComponent;

    @Output('onQueryUpdated') onQueryUpdated: EventEmitter<Filter> = new EventEmitter<Filter>();

    @Input('fields') fields: Array<ListItem>;
    @Input('operators') operators: Array<ListItem>;
    @Input('conditions') conditions: Array<ListItem>;

    public filter: Filter;
    public output: string;

    constructor() {
        this.filter = {
            group: {
                groupId: Utils.generateUUID(),
                operator: { name: 'AND', id: 'and' },
                rules: []
            }
        };
    }

    public queryUpdated(group: Group): void {
        this.onQueryUpdated.emit(this.filter);
    }

    private htmlEntities(str): string {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    public computed(group: Group): string {
        if (!group) return '';
        let str = '';
        for (let i = 0; i < group.rules.length; i++) {

            let rule: Rule = group.rules[i];
            
            let operatorName: string = Utils.isNull(group.operator) ||
                Utils.isBlankString(group.operator.name) ? '' :
                group.operator.name;

            let ruleFieldName: string = Utils.isNull(rule.field) ||
                Utils.isBlankString(rule.field.name) ? '' :
                rule.field.name;

            let conditionName: string = Utils.isNull(rule.condition) ||
                Utils.isBlankString(rule.condition.name) ? '' :
                rule.condition.name;

            let value: string = Utils.isBlankString(rule.data) ?
                '' :
                rule.data;

            if (!Utils.isBlankString(rule.data)) {
                value = '\'' + value + '\'';
            }

            i > 0 && (str += ' ' + operatorName + ' ');

            str += rule.group ?
                this.computed(rule.group) :
                ruleFieldName + ' ' + this.htmlEntities(conditionName) + ' ' + value;
        }

        str = str.trim();

        if (Utils.isBlankString(str)) {
            return '';
        }
        return '(' + str + ')';
    }


    public getOutput(): string {
        return this.computed(this.filter.group);
    }



}