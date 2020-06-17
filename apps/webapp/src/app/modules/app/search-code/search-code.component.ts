import { Component, OnInit } from '@angular/core';
import {SnackCodeService} from '../../../services/snack-code.service';
import {CodeTagDto} from '@gitcode/data';

@Component({
  selector: 'gitcode-search-code',
  templateUrl: './search-code.component.html',
  styleUrls: ['./search-code.component.scss']
})
export class SearchCodeComponent implements OnInit {

  constructor(private snackCodeService: SnackCodeService) { }

  ngOnInit(): void {
    this.snackCodeService.getTags().subscribe(result => {
      console.log(result);
    });

    const payload: [CodeTagDto] = null;

    // const payload: [CodeTagDto] = [{
    //   tagName: null,
    //   categoryType: null,
    // }];

    this.snackCodeService.getContents(payload).subscribe(result => {
      console.log(result);
    });
  }

}
