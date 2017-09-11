import { Component, OnInit } from '@angular/core';
import { Modal, NavController, ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import {AuthService} from '../../shared/services/auth.service';
import {DataService} from '../../shared/services/data.service';
import { IThread, UserCredentials } from '../../shared/interfaces';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

	LoginFirebaseAccountForm: FormGroup;
	email: AbstractControl;
	password: AbstractControl;

  constructor(private navCtrl: NavController, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, 
    private viewCtrl: ViewController,
    private fb: FormBuilder, private dataService: DataService,
    private authService: AuthService) {
  }

  ngOnInit() {
  	this.LoginFirebaseAccountForm = this.fb.group({
  		'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
  	});

  	this.email = this.LoginFirebaseAccountForm.controls['email'];
    this.password = this.LoginFirebaseAccountForm.controls['password'];
  }

 onSubmit(signInForm: any): void {
    var self = this;

    if (this.LoginFirebaseAccountForm.valid) {
      // code...
      let loader = this.loadingCtrl.create({
        content: 'Signin in firebase...',
        dismissOnPageChange: true
      });

      let user: UserCredentials = {

        email: signInForm.email,
        password: signInForm.password

      };

      loader.present();

      this.authService.signInUser(user.email, user.password)
        .then(function  (result) {
          // body...
          self.navCtrl.setRoot(TabsPage);
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(error);
          loader.dismiss().then(() => {
            let toast = self.toastCtrl.create({
              message: error.code,
                  duration: 4000,
                  position: 'top'
                });
            toast.present();
          });
        });
    }
  }

  register() {
  	this.navCtrl.push(SignupPage);
  }

}
