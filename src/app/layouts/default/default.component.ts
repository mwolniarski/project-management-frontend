import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isSideBarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggle() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
