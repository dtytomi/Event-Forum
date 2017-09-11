import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import {AuthService} from '../../shared/services/auth.service';
import {DataService} from '../../shared/services/data.service';
import { IUser, IComment } from '../../shared/interfaces';


/**
 * Generated class for the CommentCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-comment-create',
  templateUrl: 'comment-create.html'
})
export class CommentCreatePage implements OnInit {

	createCommentForm: FormGroup;
  comment: AbstractControl;
  threadKey: string;
 	loaded: boolean = false;

  constructor(public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public viewCtrl: ViewController, 
      public fb: FormBuilder, public dataService: DataService,
      public authService: AuthService, 
      public navParams: NavParams) {

  }

  ngOnInit() {

  	this.threadKey = this.navParams.get('threadKey');

  	this.createCommentForm = this.fb.group({
      'comment': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    this.comment = this.createCommentForm.controls['comment'];
    this.loaded = true;
  }

  cancelNewComment() {
  	this.viewCtrl.dismiss();
  }

  onSubmit(commentForm: any): void {
  	var self = this;

  	if (this.createCommentForm.valid) {

  		let loader = this.loadingCtrl.create({

  			content: 'Posting comment...',
  			dismissOnPageChange: true
  		});

  		loader.present();

  		let uid = self.authService.getLoggedInUser().uid;
  		self.dataService.getUsername(uid).then(function (snapshot) {
  			let username = snapshot.val();

  			let commentRef = self.dataService.getCommentsRef().push();
  			let commentKey: string = commentRef.key;

  			let user: IUser = { uid: uid, username: username };
  			let newComment: IComment = {
  				key: commentKey,
  				text: commentForm.comment,
  				thread: self.threadKey,
  				user: String(user),
  				dateCreated: new Date().toString(),
  				votesUp: null,
  				votesDown: null
  			};

  			self.dataService.submitComment(self.threadKey, newComment)
  				.then(function (snapshot) {
  					loader.dismiss()
  						.then(() => {
  							self.viewCtrl.dismiss({
  								comment: newComment,
  								user: user
  							});
  						});
  				}, function (error) {
  					// The promise was rejected
  					console.error(error);
  					loader.dismiss();
  				});
  		});

  	}
  }

}
