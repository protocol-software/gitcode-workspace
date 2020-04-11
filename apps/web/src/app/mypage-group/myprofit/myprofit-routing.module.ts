import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyprofitComponent } from './myprofit.component';

// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      // component: LayoutComponent,
  
      children: [
        { path: '', component: MyprofitComponent },
      ],
    },
  ]),
],
  exports: [RouterModule]
})
export class MyprofitRoutingModule { }
