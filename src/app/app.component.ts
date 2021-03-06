﻿import { Component } from '@angular/core';
import {
  Field,
  Operator,
  Query,
  Utils
} from '../query-builder/query-builder.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Angular Query Builder!';

  fields: Array<Field> = [
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

  operators: Array<Operator> = ['and', 'or'];
  myQuery: any;
  queryOutput: string;

  query: Query;
  queryChange(event: Query) {
    this.myQuery = event;
  }
  queryString(event: string) {
    this.queryOutput = event;
  }
}
