import {Component, ViewChild, OnInit } from '@angular/core';
import {Platform, MenuController, ViewController, Events, ModalController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from '../../node_modules/rxjs/Subscription';

import { AuthService } from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';
import { SqliteService } from '../shared/services/sqlite.service';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class Eventsforum implements OnInit {
  @ViewChild('content') nav: any;

  private rootPage: any;
  public loginPage: LoginPage; 

  connectSubscription: Subscription;  

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen,
    public dataService: DataService, public authService: AuthService,
    public sqliteService: SqliteService,  public menu: MenuController,
    public events: Events, public modalCtrl: ModalController,
    public network: Network ) {

    var self = this;
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      if (window.cordova) {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        self.watchForConnection();
        self.watchForDisconnect();
        splashScreen.hide();

        console.log('in ready..');
        let array: string[] = platform.platforms();
        console.log(array);
        self.sqliteService.InitDatabase();
      }
    });
  }

    watchForConnection() {
    var self = this;
    self.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait
      // prior to doing any api requests as well.
      setTimeout(() => {
        console.log('we got a connection..');
        console.log('Firebase: Go Online..');
        self.dataService.goOnline();
        self.events.publish('network:connected', true);
      }, 3000);
    });
  }

  watchForDisconnect() {
    var self = this;
    // watch network for a disconnect
    self.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      console.log('Firebase: Go Offline..');
      //self.sqliteService.resetDatabase();
      self.dataService.goOffline();
      self.events.publish('network:connected', false);
    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    var self = this;

    this.authService.onAuthStateChanged(function (user) {
      if (user === null) {
        self.menu.close();
        //self.nav.setRoot(LoginPage);

        let loginodal = self.modalCtrl.create(LoginPage);
        loginodal.present();
      }
    });
  }

  openPage(page) {
    let viewCtrl: ViewController = this.nav.getActive();
    // close the menu when clicking a link from the menu
    this.menu.close();

    if (page === 'signup') {
      if (!(viewCtrl.instance instanceof SignupPage))
        this.nav.push(SignupPage);
    }
  }

  signout() {
    var self = this;
    self.menu.close();
    self.authService.signOut();
  }

  isUserLoggedIn(): boolean {
    let user = this.authService.getLoggedInUser();
    return user !== null;
  }
}

