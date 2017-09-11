import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import {AuthService} from '../../shared/services/auth.service';
import {DataService} from '../../shared/services/data.service';
import { IThread } from '../../shared/interfaces';

/**
 * Generated class for the ThreadCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-thread-create',
  templateUrl: 'thread-create.html'
})
export class ThreadCreatePage implements OnInit {

	createThreadForm: FormGroup;
  title: AbstractControl;
  question: AbstractControl;
  category: AbstractControl;

  constructor(private loadingCtrl: LoadingController,
    private viewCtrl: ViewController, private fb: FormBuilder, private dataService: DataService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.createThreadForm = this.fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'question': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'category': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.title = this.createThreadForm.controls['title'];
    this.question = this.createThreadForm.controls['question'];
    this.category = this.createThreadForm.controls['category'];
    
  }

  cancelNewThread() {
  	this.viewCtrl.dismiss();
  }

  onSubmit(thread: any): void {
    var self = this;

    if (this.createThreadForm.valid) {
      // code...
      let loader = this.loadingCtrl.create({
        content: 'Posting thread...',
        dismissOnPageChange: true
      });

      loader.present();

      let uid = self.authService.getLoggedInUser().uid;
      self.dataService.getUsername(uid).then(function (snapshot) {
        let username = snapshot.val();

        self.dataService.getTotalThreads().then(function (snapshot) {
          let currentNumber = snapshot.val();
          let newPriority: number = currentNumber === null ? 1 : (currentNumber + 1);

          let newThread: IThread = {
            key: null,
            title: thread.title,
            question: thread.question,
            category: thread.category,
            user: { uid: uid, username: username },
            dateCreated: new Date().toString(),
            comments: null
          };

          self.dataService.submitThread(newThread, newPriority)
            .then(function (snapshot) {
              loader.dismiss()
                .then(() => {
                  self.viewCtrl.dismiss({
                    thread: newThread,
                    priority: newPriority
                  });
                });
            }, function (error) {
              // The Promise was rejected.
              console.error(error);
              loader.dismiss();
            });
        });
      });
    }
  }


}
