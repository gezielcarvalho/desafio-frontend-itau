import { Routes } from '@angular/router';
import { BusinessListComponent } from './business/business-list/business-list.component';
import { BusinessDetailComponent } from './business/business-detail/business-detail.component';

export const routes: Routes = [
  { path: '', component: BusinessListComponent },
  { path: 'business-detail/:id', component: BusinessDetailComponent },
  { path: 'business-detail', component: BusinessDetailComponent },
];
