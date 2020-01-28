import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IPromotionalCode } from '@re-code-io/data';
import { PromotionalCodeService } from '@re-code-io/ui';

@Component({
  selector: 'app-promotional-code',
  templateUrl: './promotional-code.component.html',
  styleUrls: ['./promotional-code.component.scss'],
})
export class PromotionalCodeComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'promotional-code light-theme';

  public isPromotionCodeChecking: boolean;
  public promotionCodeFormControl = new FormControl();

  @Output() public promotionCodeApplied: EventEmitter<IPromotionalCode> = new EventEmitter<IPromotionalCode>();

  constructor(private promotionalCodeService: PromotionalCodeService) {
    this.promotionCodeFormControl.setValidators(Validators.compose([Validators.required]));
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public applyPromotionCode(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.isPromotionCodeChecking = true;

    const upperCasePromotionalCode = this.promotionCodeFormControl.value.toString().trim().toUpperCase();
    this.promotionCodeFormControl.patchValue(upperCasePromotionalCode);
    this.promotionalCodeService.getPromotionalCode(upperCasePromotionalCode).subscribe(
      (promotionalCode) => {
        if (!promotionalCode || !promotionalCode.isActive) {
          this.promotionCodeFormControl.setErrors({ invalid: true });
          this.isPromotionCodeChecking = false;
          return;
        }

        this.promotionCodeFormControl.setErrors(null);
        this.isPromotionCodeChecking = false;
        this.promotionCodeApplied.emit(promotionalCode);
      },
    );
  }
}
