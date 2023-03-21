import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter<any>();
  @Input() isSideBarOpen = false;

  constructor() { }

  ngOnInit(): void {

  }

  toggleSideBarStatus(){
    this.toggleSideBar.emit();
  }
}
