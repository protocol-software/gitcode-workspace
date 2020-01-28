import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutResolver } from './logout/logout.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'logout', pathMatch: 'full', resolve: { result: LogoutResolver }, children: [] },

  { path: 'users', loadChildren: () => import('./mystique-page/mystique-page.module').then(m => m.MystiqueModule), },
  { path: 'admin-users', loadChildren: () => import('./mystique-page/mystique-page.module').then(m => m.MystiqueModule), },
  { path: 'subscribers', loadChildren: () => import('./subscribers/subscribers.module').then(m => m.SubscribersModule), },
  { path: 'public-prs', loadChildren: () => import('./mystique-page/mystique-page.module').then(m => m.MystiqueModule), },
  { path: 'private-prs', loadChildren: () => import('./mystique-page/mystique-page.module').then(m => m.MystiqueModule), },
  { path: 'payment-history', loadChildren: () => import('./mystique-page/mystique-page.module').then(m => m.MystiqueModule), },
  { path: 'github-webhook-logs', loadChildren: () => import('./mystique-page/mystique-page.module').then(m => m.MystiqueModule), },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
