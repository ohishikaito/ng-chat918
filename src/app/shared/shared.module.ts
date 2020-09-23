import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ChatDatePipe } from './pipe/chat-date.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChatDatePipe],
  exports: [CommonModule, FormsModule, ChatDatePipe],
})
export class SharedModule {}
