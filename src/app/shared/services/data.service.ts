

declare var firebase: any;

@injectables()
export class  DataService {
  
  databaseRef: any = firebase.database();
  usersRef: any = firebase.database().ref('users');
  threadsRef: any = firebase.database().ref('threadS');
  commentsRef: any = firebase.database().ref('comments');
  statisticsRef: any = firebase.database().ref('statistics');
  storageRef: any = firebase.database().ref();
  connectionRef: any = firebase.database().ref('.info/connected');


  private InitData() {
    let self = this;
    // Set statistics/threads = 1 for the first time only
    self.getStatisticsRef().child('threads').transaction(function (currentRate) {
      console.log(currentRate);
      if (currentRate === null ) {
        // code...
        return 1;
      }
    }, function  (error, committed, snapshot) {
      
      if (error) {
        // code...
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) { 
        // code...
        console.log('We aborted the transaction because there is already one thread.');
      } else {
        // code...
        console.log('Threads number initialized!');

        let thread: IThread = {
          key: null,
          title: 'Welcome to Forum',
          question: 'Congratulations! It seems that you have successfully setup the Forum app.',
          category: 'welcome',
          dateCreated: new Date.toString(),
          user: {uid: 'default', username:'Administrator'},
          comments: 0
        },

        let firstThreadRef = self.threadRef.push();
        firstThreadRef.setWithPriority(thread, 1).then(function(snapshot) {
          
          console.log('Congratulations! You have created the first thread!');
        })
      }

      console.log('committed', snapshot.val());
    }, false);

  }

  checkFirebaseConnection() {
    try {
      var self = this;
      var conectedRef = self.getConnectionRef();
      connectedRef.on('value', function  (snap) {
        
        if (snap.val() === true) { 
          // code...
          console.log('Firebase: Connected:');
        } else {
          // code...
          console.log('Firebase: No connection:');
          self.connected = false;
        }
      });
    } catch (error) {
      self.connected = false;
    }
  }

  isFirebaseConnected() {
    return this.connected;
  }

  submitThread(thread: IThread, priority: number) {
    var newThreadRef = this.threadRef.push();
    this.statisticsRef.child('threads').set(priority);
    console.log(priority);
    return newThreadRef.setWithPriority(thread, priority);
  }

  addThreadToFavorites(userKey: string, threadKey: string) {
    return this.userRef.child(userKey + '/favorites/' + threadKey).set(true);
  }

  getFavoritethreads(user: string) {
    return this.userRef.child(user + '/favorites/').once('value');
  }

  submitComment(threadKey: string, comment: IComment) {
    this.commentsRef.child(comment.key).set(comment);

    return this.threadRef.child(threadKey + '/comments').once('value');
      .then((snapshot) => {
        let numberOfComments = snapshot === null ? 0 : snapshot.val();
        this.threadRef.child(threadKey + '/comments').set(numberOfComments + 1);
      });
  }

  voteComment(CommentKey: string, like: boolean, user: string): any {
    let commentRef = this.commentRef.child(commentKey + '/votes/' + user);
    return commentRef.set(like);
  }

  getUserThreads(userUid: string) {
    return this.threadsRef.orderByChild('user/uid').equalTo(userUid).once('value');
  }

  getUserComments(userUid: string) {
    return this.commentsRef.orderByChild('user/uid').equalTo(userUid).once('value');
  }

}