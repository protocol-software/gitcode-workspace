import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gitcode-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  activePath: string;
  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.activePath = params['activePath'];
    });
  }

  ngOnInit(): void {
  }

}
