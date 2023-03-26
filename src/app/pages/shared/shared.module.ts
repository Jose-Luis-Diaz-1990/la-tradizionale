import { PaginationPipe } from './pipes/pagination/pagination.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    PaginationPipe,
    PaginationComponent,
 
  ],
  imports: [
    CommonModule
  ],
  exports: [
 
    PaginationPipe,
    PaginationComponent,
  ]
})
export class SharedModule { }
