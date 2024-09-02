import { Routes } from '@angular/router';

import { BusinessDetailComponent } from './business/business-detail/business-detail.component';
import { BusinessListComponent } from './business/business-list/business-list.component';

export const routes: Routes = [
  { path: '', component: BusinessListComponent },
  // Route for edting a business
  { path: 'business-detail/:id', component: BusinessDetailComponent },
  // Route for creating a business
  { path: 'business-detail', component: BusinessDetailComponent },
];
