import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    /* modules */
    CommonModule, FormsModule, RouterModule
  ],
  exports: [
    /* modules/components/directives/pipes that other modules may use */
    CommonModule, FormsModule, RouterModule
  ],
  declarations: [],
  providers: [
  ]
})
export class CoreModule {}