import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyRevieweeComponent } from './apply-reviewee/apply-reviewee.component';
import { ApplyReviewerComponent } from './apply-reviewer/apply-reviewer.component';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
// import { MypagePublicPRComponent } from './mypage_public_pr/mypage_public_pr.component'
import { LoginComponent } from './login/login.component';
import { LogoutResolver } from './logout/logout.resolver';
import { RegisterComponent } from './register/register.component';
// import { WrittenReviewComponent } from './written-review/written-review.component';
// import { RequestClaimComponent } from './request-claim/request-claim.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'logout', pathMatch: 'full', resolve: { result: LogoutResolver }, children: [] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  {
    path: 'how-it-works',
    loadChildren: () => import('./how-it-works/how-it-works.module').then(m => m.HowItWorksModule),
  },
  {
    path: 'pricing',
    loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule),
  },{	
    path: 'written-review',	
    loadChildren: () => import('./written-review/written-review.module').then(m => m.WrittenReviewModule),
  },

  {
    path: 'pull-requests',
    loadChildren: () => import('./pull-requests/pull-requests.module').then(m => m.PullRequestsModule),
  },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path:'request-claim',loadChildren: () => import('./request-claim/request-claim.module').then(m=>m.RequestClaimModule)},
  
  { path: 'apply-reviewee', component: ApplyRevieweeComponent },
  { path: 'apply-reviewer', component: ApplyReviewerComponent },
  { path: 'pr', 
    loadChildren: () => import('./mypage_public_pr/mypage_public_pr.module').then(m => m.MypagePublicPRModule),
  },
  { path: 'my', 
    loadChildren: () => import('./mypage-group/myprofit/myprofit.module').then(m => m.MyprofitModule),
  },
  { path: 'receive-review', 
    loadChildren: () => import('./mypage_receive_review/mypage_receive_review.module').then(m => m.MypageReceiveReviewModule),
  },
  { path: '**', redirectTo: 'home' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      // useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
