import {CommonModule } from '@angular/common';
import {NgModule } from '@angular/core';
import {TranslateModule } from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {LayoutModule } from '../layout/layout.module';
import {FormsModule } from '@angular/forms';
import {MypageGroupComponent } from './mypage-group.component';
import {MypageGroupRoutingModule } from './mypage-group.routing.module';
import {StarRatingModule } from 'angular-star-rating';
import {PublicPRModule} from './public-pr/public-pr.module';
import {PrivatePrModule} from './private-pr/private-pr.module';
import {PaymentModule} from './payment/payment.module';
import {ActivityModule} from './activity/activity.module';
import {MyprofitModule} from './myprofit/myprofit.module';
@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MypageGroupRoutingModule,
    TranslateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatRippleModule,
    StarRatingModule,
    MatGridListModule,
    PublicPRModule,
    PrivatePrModule,
    PaymentModule,
    ActivityModule,
    MyprofitModule,
  ],
  declarations: [MypageGroupComponent],
  providers: [],
  exports: [MypageGroupComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    ActivityModule,]
  ,
})
export class MypageGroupModule { }
