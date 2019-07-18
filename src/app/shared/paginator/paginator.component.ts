import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() elements: any;
  @Input() selectedPage: any;
  @Output() changePageEmitter = new EventEmitter();
  pagesNumber: any;
  pages = [];

  constructor() { }

  ngOnInit() {
    this.pagesNumber = Math.ceil(this.elements / 30);
    for (let i = 1; i <= this.pagesNumber; i++) {
      this.pages.push(i);
    }
  }

  changePage(page) {
    if (page === this.selectedPage) {
      return;
    }
    this.changePageEmitter.emit(page);
  }

}
