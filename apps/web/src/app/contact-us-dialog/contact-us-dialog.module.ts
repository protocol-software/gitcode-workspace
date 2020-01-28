import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@re-code-io/ui';
import { ContactUsDialogComponent } from './contact-us-dialog.component';
import { ContactUsDialogService } from './contact-us-dialog.service';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    UiModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  declarations: [
    ContactUsDialogComponent,
    ContactUsFormComponent,
  ],
  providers: [
    ContactUsDialogService,
  ],
  exports: [ContactUsDialogComponent],
  entryComponents: [ContactUsDialogComponent],
})
export class ContactUsDialogModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: ContactUsDialogModule,
  //     providers: [ContactUsDialogService],
  //   };
  // }
}
