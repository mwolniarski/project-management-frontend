import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = [
    {name: "Task 1", owner: "John", status: "Close", startDate: "06-12-2021", dueDate: "06-12-2021", priority: "Low"},
    {name: "Task 2", owner: "Michael", status: "In progress", startDate: "06-12-2021", dueDate: "06-12-2021", priority: "Low"},
    {name: "Task 3", owner: "John", status: "Open", startDate: "06-12-2021", dueDate: "06-12-2021", priority: "Medium"},
    {name: "Task 4", owner: "John", status: "Close", startDate: "06-12-2021", dueDate: "06-12-2021", priority: "High"},
    {name: "Task 5", owner: "John", status: "Open", startDate: "06-12-2021", dueDate: "06-12-2021", priority: "Low"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
