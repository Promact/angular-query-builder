﻿import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QueryBuilderComponent } from './query-builder.component';
import { QueryBuilderGroupComponent } from './query-builder-group.component';
import { QueryBuilderConditionComponent } from './query-builder-condition.component';

@NgModule({
  entryComponents: [
    QueryBuilderComponent
  ],
  imports:
  [
    BrowserModule,
    FormsModule
  ],
  declarations:
  [
    QueryBuilderComponent,
    QueryBuilderGroupComponent,
    QueryBuilderConditionComponent
  ],
  exports: [
    QueryBuilderComponent
  ]
})
export class QueryBuilderModule { }

