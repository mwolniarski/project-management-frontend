import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {name: "Project 1", owner: "John", status: "Active", taskCount: 12, completedTasksCount: 6, startDate: "2023-01-01", endDate: "2024-01-01"},
    {name: "Project 2", owner: "Mathew", status: "Inactive", taskCount: 12, completedTasksCount: 11, startDate: "2023-01-01", endDate: "2024-01-01"},
    {name: "Project 3", owner: "Julia", status: "Inactive", taskCount: 3, completedTasksCount: 1, startDate: "2023-01-01", endDate: "2024-01-01"},
    {name: "Project 4", owner: "Charlotte", status: "Active", taskCount: 12, completedTasksCount: 1, startDate: "2023-01-01", endDate: "2024-01-01"},
  ];

  displayedColumns = ["name", "owner", "status", "progression", "startDate", "endDate"];

  constructor() { }

  ngOnInit(): void {
  }

  getPercent(allTasks: number, completedTasks: number){
    return Math.trunc(((completedTasks/allTasks)*100));
  }

}
