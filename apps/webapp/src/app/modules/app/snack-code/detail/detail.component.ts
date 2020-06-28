import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gitcode-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input('snackCodeId') snackCodeId: string;
  contentPath: string;

  constructor() {
  }

  ngOnInit(): void {
    this.contentPath = `/assets/snack-code/contents/${this.snackCodeId}.md`;
  }

}
