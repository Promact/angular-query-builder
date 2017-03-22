import { SimpleChange, Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ListItem, Group, Rule, Filter, Utils } from 'query-builder/query-builder.interfaces';

@Component({
    selector: 'query-builder-group',
    templateUrl: 'query-builder-group.html',
    styleUrls: ['query-builder-group.css'],
    providers: []
})
export default class QueryBuilderGroupComponent implements OnInit {

    @Output('onQueryUpdated') onQueryUpdated: EventEmitter<Group> = new EventEmitter<Group>();
    @Input('parent-group') parentGroup: Group;
    @Input('group') group: Group;
    @Input('fields') fields: Array<ListItem>;
    @Input('operators') operators: Array<ListItem>;
    @Input('conditions') conditions: Array<ListItem>;

    public isLoaded: boolean = false;
    public output: any;

    constructor() {
    }

    ngOnInit() { }

    ngAfterViewInit(): void {
        this.isLoaded = true;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        console.log(changes);
    }

    public queryUpdated(group: Group): void {
        this.onQueryUpdated.emit(this.group);
    }

    public changeGroupOperator(value: ListItem): void {
        this.group.operator = value;
        this.onQueryUpdated.emit(this.group);
    }

    public changeRuleField(rule: Rule, value: ListItem): void {
        rule.field = value;
        this.onQueryUpdated.emit(this.group);
    }

    public changeRuleCondition(rule: Rule, value: ListItem): void {
        rule.condition = value;
        this.onQueryUpdated.emit(this.group);
    }

    public changeRuleData(rule: Rule, value: string): void {
        rule.data = value;
        this.onQueryUpdated.emit(this.group);
    }

    public addCondition(): void {
        this.group.rules.push({
            condition: { name: 'AND', id: 'and' },
            field: { name: '', id: '' },
            data: ''
        });
        this.onQueryUpdated.emit(this.group);
    }

    public removeCondition(index) {
        this.group.rules.splice(index, 1);
        this.onQueryUpdated.emit(this.group);
    }

    public addGroup(): void {
        console.log(this.group);
        this.group.rules.push({
            group: {
                groupId: Utils.generateUUID(),
                operator: { name: 'AND', id: 'and' },
                rules: []
            }
        });
        console.log(this.group);
       this.onQueryUpdated.emit(this.group);
    }

    public removeGroup(): void {
        if (this.parentGroup === undefined) {
            return;
        }
        let index: number = this.parentGroup.rules.findIndex((r: Rule) => {
            return r.hasOwnProperty('group') && r.group.groupId === this.group.groupId;
        });
        this.parentGroup.rules.splice(index, 1);
        this.onQueryUpdated.emit(this.group);
    }



}