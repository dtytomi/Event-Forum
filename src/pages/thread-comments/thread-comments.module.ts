import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThreadCommentsPage } from './thread-comments';

@NgModule({
  declarations: [
    ThreadCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ThreadCommentsPage),
  ],
  exports: [
    ThreadCommentsPage
  ]
})
export class ThreadCommentsPageModule {}
