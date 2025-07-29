import { Routes } from '@angular/router';
import { HomeComponent } from '../component/home.component';
import { PredictionsComponent } from '../component/predictions.component';
import { InvestmentsComponent } from '../component/investments.component';
import { ImportDataComponent } from '../component/Importdata.component';
//import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  // Default redirect to home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // Home page route
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  // Messages page route
  {
    path: 'investments',
    component: InvestmentsComponent,
    title: 'Investments'
  },

    {
    path: 'predictions',
    component: PredictionsComponent,
    title: 'Predictions'
  },
  {
    path: 'importdata',
    component: ImportDataComponent,
    title: 'ImportData'
  },
  // About page route
//   {
//     path: 'about',
//     component: AboutComponent,
//     title: 'About'
//   },
  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/home'
  }
];
