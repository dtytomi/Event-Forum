import {AuthService} from '../shared/services/auth.service';
import {DataService} from '../shared/services/data.service';
import {SqliteService} from '../shared/services/sqlite.service';
import {ItemsService} from '../shared/services/items.service';
import {MappingsService} from '../shared/services/mappings.service';

export const APP_PROVIDERS = [
    AuthService,
    DataService,
    SqliteService,
    ItemsService,
    MappingsService
];