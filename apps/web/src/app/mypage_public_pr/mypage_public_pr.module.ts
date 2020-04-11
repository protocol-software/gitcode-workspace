import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';
import { MypagePublicPRComponent } from './mypage_public_pr.component';
import { MypagePublicPRRoutingModule } from './mypage_public_pr.routing.module';
import {MypageLeftcardModule} from '../mypage-leftcard/mypage-leftcard.module'
import {MypageGroupModule} from '../mypage-group/mypage-group.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MypagePublicPRRoutingModule,
    TranslateModule,
    MypageLeftcardModule,
    MypageGroupModule,
  ],
  declarations: [MypagePublicPRComponent
  
  ],
  providers: [],
  exports: [
    MypagePublicPRComponent,
     ],
})
export class MypagePublicPRModule {}
