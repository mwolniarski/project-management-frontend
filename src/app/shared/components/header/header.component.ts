import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter<any>();
  @Input() isSideBarOpen = false;

  ngOnInit(): void {
  }

  toggleSideBarStatus() {
    this.toggleSideBar.emit();
  }

  // items = [
  //   {
  //     label: 'File',
  //     items: [{
  //       label: 'New',
  //       icon: 'pi pi-fw pi-plus',
  //       items: [
  //         {label: 'Project'},
  //         {label: 'Other'},
  //       ]
  //     },
  //       {label: 'Open'},
  //       {label: 'Quit'}
  //     ]
  //   },
  //   {
  //     label: 'Edit',
  //     icon: 'pi pi-fw pi-pencil',
  //     items: [
  //       {label: 'Delete', icon: 'pi pi-fw pi-trash'},
  //       {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
  //     ]
  //   }
  // ];
}
