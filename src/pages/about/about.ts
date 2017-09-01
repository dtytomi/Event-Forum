import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
  }

  openUrl(url) {
  	let browser = new InAppBrowser(url, '_blank', 'location=yes');
  }

}
