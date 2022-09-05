import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

const modules = [MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports:  modules,

})
export class MaterialModule { }
