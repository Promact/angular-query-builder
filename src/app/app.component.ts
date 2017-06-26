import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Angular Query Builder!';

  fields: Array<any> = [
    {
      name: 'first name',
      operators: ['=', '!=', '>', '<'],
      type: 'text'
    },
    {
      name: 'last name',
      operators: ['=', '!=', '>', '<'],
      type: 'text'
    },
    {
      name: 'address',
      operators: ['=', '!=', '>', '<'],
      type: 'text'
    },
    {
      name: 'city',
      operators: ['=', '!=', '>', '<'],
      type: 'text'
    },
    {
      name: 'birthdate',
      operators: ['>', '<'],
      type: 'date'
    },
    {
      name: 'user',
      operators: ['=', '!='],
      type: 'enum',
      enum: [
        { text: 'Customer', value: 0 },
        { text: 'Dealer', value: 1 },
        { text: 'Consumer', value: 2 }
      ]
    },
    {
      name: 'status',
      operators: ['=', '!='],
      type: 'boolean'
    },
  ];
  operators: any = ['and', 'or'];
  myQuery: any;

  query: any;
  queryChange(event: any) {
    this.myQuery = event;
  }
}
