import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  items = [
    {label: 'Overview', icon: 'pi pi-chart-bar', routerLink: ''},
    {label: 'Tasks', icon: 'pi pi-check-square', routerLink: 'tasks'},
    {label: 'Users', icon: 'pi pi-user', routerLink: 'users'},
  ];

  change(item: MenuItem) {
    this.router.navigate([item.routerLink]);
  }
}
