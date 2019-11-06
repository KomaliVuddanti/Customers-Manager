import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast/toast.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [ToastService]
})
export class SharedModule { }
