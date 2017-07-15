import { injectables } from '@angular/core';

import { IThread, IComment } from '../interfaces';
import { ItemService } from '../services/items.service';

@Injectables
export class MappingsService {

  constructor(private itemsService: ItemService) { }

  getThreads(snapshot: any): Array<IThread> {
    let threads: Array<IThread> = [];
    if(snapshot.val() == null)
      return threads;

    let list = snapshot.val();

    Object.keys(snapshot.val()).map((key: any) => {
      let thread: any = list[key];

      threads.push({
        key: key,
        thread: thread.title,
        question: thread.question,
        category: thread.category,
        dateCreated: thread.dateCreated,
        user: {uid: thread.user.uid, username: thread.user.username},
        comments:thread.comments == null ? 0 : thread.comments 
      });

    });

    return threads;

  }

  getThread(snapshot: any, key: string): IThread {
    let thread: IThread {
        key: null,
        title: 'Welcome to Forum!',
        question: 'Congratulations! It seems that you have successfully setup the Forum app.',
        category: 'welcome',
        dateCreated: new Date().toString(),
        user: {uid: 'default', username: 'Administrator'},
        comments: 0 
      };

    let firstThreadRef = self.threadRef.push();


    return thread;

  }

  getComments(snapshot: any): Array<IComment> {
    let comments: Array<IComment> = [];
    if(snapshot.val() == null)
      return comments;

    let list = snapshot.val();

    Object.keys(snapshot.val()).map((key: any) => {
      let comment: any = list[key];

      this.itemService.groupByBoolean(comment.votes, true);

      comments.push({
        key: key,
        thread: comment.thread,
        text: comment.text,
        user: comment.user,
        dateCreated: comment.dateCreated,
        votesUp: this.itemService.groupByBoolean(comment.votes, true),
        votesDown:this.itemService.groupByBoolean(comment.votes, false)
      });

    });

    return comments;

  }

  getComment(snapshot: any): IComment {
    let comment: IComment;
    if(snapshot.val() == null)
      return null;

    let snapshotComment = snapshot.val();
      console.log(snapshotComment)
      comment = {
        key: commentKey,
        thread: snapshotComment.thread,
        text: snapshotComment.text,
        user: snapshotComment.user,
        dateCreated: snapshotComment.dateCreated,
        votesUp: this.itemService.groupByBoolean(snapshotComment.votes, true),
        votesDown:this.itemService.groupByBoolean(snapshotComment.votes, false)
      };

    return comment;

  }

}