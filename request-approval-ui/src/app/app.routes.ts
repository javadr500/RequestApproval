import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'requests',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/requests/request-list/request-list.component')
        .then(m => m.RequestListComponent)
  },

  {
    path: 'requests/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/requests/request-form/request-form.component')
        .then(m => m.RequestFormComponent)
  },

  {
    path: '',
    redirectTo: 'requests',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'requests'
  }
];
