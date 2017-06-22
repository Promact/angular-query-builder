import { Component, ViewChild } from '@angular/core';
import { ListItem, Filter } from "query-builder/query-builder.interfaces";
import { QueryBuilderComponent } from "query-builder/query-builder.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [QueryBuilderComponent]
})
export default class AppComponent {

  @ViewChild('qb') _queryBuilder: QueryBuilderComponent;

  public title: string = 'Angular Query Builder!';
  public output: string;

  public fields: Array<ListItem>;
  public operators: Array<ListItem>;
  public conditions: Array<ListItem>;

  constructor() {
    //create the vales that will populate the dropdowns of the query builder
    //to get more control over the expression created you may want to move these queryUpdated
    //to the query-builder- and query-builder-group and also change the ListItem type to your 
    //custom types
    this.fields = [
      { name: 'Firstname', id: 'firstname' },
      { name: 'Lastname', id: 'lastname' },
      { name: 'Birthdate', id: 'birthdate' },
      { name: 'City', id: 'city' },
      { name: 'Country', id: 'country' }
    ];
    this.operators = [
      { name: 'AND', id: 'and' },
      { name: 'OR', id: 'or' }
    ];
    this.conditions = [
      { name: '=', id: '=' },
      { name: '<>', id: '<>' },
      { name: '<', id: '<' },
      { name: '<=', id: '<=' },
      { name: '>', id: '>' },
      { name: '>=', id: '>=' }
    ];
  }

  public queryUpdated(filter: Filter): void {
    console.log(filter);
    this.output = this._queryBuilder.getOutput();
  }
}
