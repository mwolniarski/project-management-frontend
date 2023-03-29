import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter<any>();
  @Input() isSideBarOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  logout(){
    this.authService.logout();
  }

  toggleSideBarStatus(){
    this.toggleSideBar.emit();
  }
}
