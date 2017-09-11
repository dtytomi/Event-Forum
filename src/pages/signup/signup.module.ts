import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
<<<<<<< a512b0104ec3eee8adfee55d1071779cbb606e01
import { SignupPage } from './login';
=======
import { SignupPage } from './signup';
>>>>>>>  newly created

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule {}
