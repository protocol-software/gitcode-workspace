import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@re-code-io/data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'users';

  public formGroup: FormGroup;
  public users: IUser[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    const prefetch = this.route.snapshot.data.prefetch;
    if (prefetch) {
      this.users = prefetch.users;
    }

    this.formGroup = this.formBuilder.group({
      // TODO: add form elements.
      sampleInput: ['', Validators.compose([Validators.required])],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onFormSubmit(event, formValue) {
    event.preventDefault();
    event.stopPropagation();

    // TODO: call API with form value.
    console.log('form submit');
  }
}
