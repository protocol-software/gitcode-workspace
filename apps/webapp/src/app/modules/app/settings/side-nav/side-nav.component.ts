import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@gitcode/data';

@Component({
  selector: 'gitcode-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @HostBinding('class') public hostClass = 'side-nav';

  @Input() public user: IUser;
  @Input() public repoCount: number;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
}
