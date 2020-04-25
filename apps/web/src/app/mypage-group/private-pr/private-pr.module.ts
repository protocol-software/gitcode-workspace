import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePrRoutingModule } from './private-pr-routing.module';
import { PrivatePrComponent } from './private-pr.component';
import {ComponentNavModule} from '../../custom-module/component-nav/component-nav.module';

import {TranslateModule } from '@ngx-translate/core';
import {LayoutModule } from '../../layout/layout.module';
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
import {StarRatingModule } from 'angular-star-rating';
import {CustomModuleModule} from '../../custom-module/custom-module.module';
import {ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import {UiModule } from '@re-code-io/ui';
import {MomentModule } from 'ngx-moment';
import {PullRequestRatingDialogModule } from '../../pull-request-rating-dialog/pull-request-rating-dialog.module';
import {PullRequestSummaryComponent} from './pull-request-summary/pull-request-summary.component';
// import {PublicPrService} from './public-pr.routing.service';
// import {PublicPrResolver} from './public-pr.routing.resolver';

@NgModule({
  declarations: [PrivatePrComponent,PullRequestSummaryComponent, 
  
  ],
  imports: [
    CommonModule,
    PrivatePrRoutingModule,
    UiModule,
    MomentModule,
    PullRequestRatingDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    LayoutModule,
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
    StarRatingModule.forChild(),
    MatGridListModule,
    CustomModuleModule,
    ComponentNavModule,
  ],
  exports:[
    PrivatePrComponent,PullRequestSummaryComponent,
  ],
})
export class PrivatePrModule { }
