import {AuthService} from './shared/services/auth.service';
import {DataService} from './shared/services/data.service';
import {SqliteService} from './shared/services/sqlite.service';
import {ItemsService} from './shared/services/items.service';
import {MappingsService} from './shared/services/mappings.service';

export class Eventsforum implements OnInit {

  @ViewChild('content') nav: Nav;

  private rootPage: any;
  private loginPage: LoginPage;

  connectSubscription: Subscription;
  
  constructor (platform: Platform, private dataService: DataService,
    private authService: AuthService, private sqliteService: SqliteService,
    private menu: MenuController, private events: Events) {
    
      var self = this;
      this.rootPage = TabsPage;

      ngOnInit() {
        var self = this;
        // This watches for Authentication events 
        this.authService.onAuthStateChanged(function (user) {
          // body...
          if (user === null) {
            // code...
            self.menu.close();
            self.nav.setRoot(LoginPage);
          }
        });
      };

  }
}