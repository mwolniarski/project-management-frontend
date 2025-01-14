import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent {

  @Input() iconClass = '';
  @Input() itemName = '';
  @Input() isSideBarOpen = false;
  @Input() redirectLink = '';
}
