import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateCharacterComponent } from './create-character.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateCharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: CreateCharacterComponent}
    ])
  ]
})
export class CreateCharacterModule {}
