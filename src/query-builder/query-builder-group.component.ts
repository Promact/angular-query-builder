import { SimpleChange, Component, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { ListItem, Group, Rule, Filter, Utils } from 'query-builder/query-builder.interfaces';

@Component({
    selector: 'query-builder-group',
    templateUrl: 'query-builder-group.html',
    styleUrls: ['query-builder-group.css'],
    providers: []
})
export default class QueryBuilderGroupComponent implements AfterViewInit {

    @Output('onQueryUpdated') onQueryUpdated: EventEmitter<Group> = new EventEmitter<Group>();
    
    @Input('parent-group') parentGroup: Group;
    @Input('group') group: Group;
    @Input('fields') fields: Array<ListItem>;
    @Input('operators') operators: Array<ListItem>;
    @Input('conditions') conditions: Array<ListItem>;

    public isLoaded: boolean = false;
    public output: any;

    constructor() {
        this.isLoaded = false;
    }

    public ngAfterViewInit(): void {
        //for some reason it does not seem to work unless this is
        //wrap in a setTimeout or some other mechanism to trigger change detection
        setTimeout(() => {
            this.isLoaded = true;;
        })
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        console.log(changes);
    }

    //handle any events from children and send them on up
    public queryUpdated(group: Group): void {
        this.onQueryUpdated.emit(this.group);
    }

    //make sure the value has changed and emit the onQueryUpdated event
    public changeGroupOperator(value: ListItem): void {
        this.group.operator = value;
        this.onQueryUpdated.emit(this.group);
    }

    //make sure the value has changed and emit the onQueryUpdated event
    public changeRuleField(rule: Rule, value: ListItem): void {
        rule.field = value;
        this.onQueryUpdated.emit(this.group);
    }

    //make sure the value has changed and emit the onQueryUpdated event
    public changeRuleCondition(rule: Rule, value: ListItem): void {
        rule.condition = value;
        this.onQueryUpdated.emit(this.group);
    }

    //make sure the value has changed and emit the onQueryUpdated event
    public changeRuleData(rule: Rule, value: string): void {
        rule.data = value;
        this.onQueryUpdated.emit(this.group);
    }

    //add a new condition and emit the onQueryUpdated event
    public addCondition(): void {
        this.group.rules.push({
            condition: { name: 'AND', id: 'and' },
            field: { name: '', id: '' },
            data: ''
        });
        this.onQueryUpdated.emit(this.group);
    }

    //remove a condition and emit the onQueryUpdated event
    public removeCondition(index) {
        this.group.rules.splice(index, 1);
        this.onQueryUpdated.emit(this.group);
    }

    //add a new group and emit the onQueryUpdated event
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

    //remove a group and emit the onQueryUpdated event
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