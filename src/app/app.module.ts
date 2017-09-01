import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { Eventsforum } from './app.component';
import { AboutPage } from '../pages/about/about';
import { CommentCreatePage } from '../pages/comment-create/comment-create';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { ThreadCommentsPage } from '../pages/thread-comments/thread-comments';
import { ThreadCreatePage } from '../pages/thread-create/thread-create';
import { ThreadsPage } from '../pages/threads/threads';

// Custom
import { ThreadComponent } from './shared/directives/thread-component';
import { UserAvatarComponent } from './shared/directives/user-avatar-component';

// Providers
import { APP_PROVIDER } from '../providers/app.providers';

@NgModule({
  declarations: [
    Eventsforum,
    AboutPage,
    CommentCreatePage,
    LoginPage,
    ProfilePage,
    SignupPage,
    TabsPage,
    ThreadCommentsPage,
    ThreadCreatePage,
    ThreadsPage,
    ThreadComponent,
    UserAvatarComponent

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Eventsforum),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Eventsforum,
    AboutPage,
    CommentCreatePage,
    LoginPage,
    ProfilePage,
    SignupPage,
    TabsPage,
    ThreadCommentsPage,
    ThreadCreatePage,
    ThreadsPage,
    ThreadComponent,
    UserAvatarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    APP_PROVIDER,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
