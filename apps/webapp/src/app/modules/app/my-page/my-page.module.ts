import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MyPageRoutes} from './my-page.routing';
import { MyPageComponent } from './my-page.component';

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    RouterModule.forChild(MyPageRoutes),
    SharedModule,
  ]
})
export class MyPageModule { }
