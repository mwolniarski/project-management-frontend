import { Component, OnInit } from '@angular/core';
import {TreeNode} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";
import {BehaviorSubject, map, take, tap} from "rxjs";
import {ProjectStatus} from "../../model/ProjectStatus.model";
import {TaskStatus} from "../../model/TaskStatus.model";
import {TaskPriority} from "../../model/TaskPriority.model";
import {LocalStorageService} from "../../../../auth/localStorage.service";
import {DialogService} from "primeng/dynamicdialog";
import {AddTaskPageComponent} from "./add-task-page/add-task-page.component";
import {TaskGroupReadModel} from "../../model/TaskGroupReadModel.model";
import {AddTaskgroupPageComponent} from "./add-taskgroup-page/add-taskgroup-page.component";
import {EditTaskPageComponent} from "./edit-task-page/edit-task-page.component";
import {TaskReadModel} from "../../model/TaskReadModel.model";
import {ProjectUserRole} from "../../model/ProjectUserRole.model";
import {AuthService} from "../../../../auth/auth.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskGroups: TreeNode[] = [];
  expandedRows: Array<number> = [];

  project = new BehaviorSubject<ProjectReadModel | null>(null);

  constructor(private projectService: ProjectService, private localStorage: LocalStorageService, private dialogService: DialogService, private authService: AuthService) {}
  ngOnInit() {
    this.expandedRows = this.localStorage.loadExpandedData();
    this.mapToTreeData();
  }

  items =
    [
      {
        label: 'Active tasks',
        icon: '',
        command: () => {

        }
      }
    ];

  createTaskGroup(){
    const ref = this.dialogService.open(AddTaskgroupPageComponent, {
      data: {
        projectId: this.project.value!.id
      },
      header: 'Add task group',
      width: '30%',
      height: '30%'
    });
    ref.onClose.subscribe((taskGroup: TaskGroupReadModel) => {
      if(this.project.value !== null){
        this.project.value.taskGroups.push(taskGroup);
        this.mapToTreeData();
      }
    });
  }

  createTask(taskGroupId: number){
    const ref = this.dialogService.open(AddTaskPageComponent, {
      data: {
        taskGroupId: taskGroupId
      },
      header: 'Add task',
      width: '80%',
      height: '80%'
    });

    ref.onClose.subscribe(task => {
      if(this.project.value !== null){
        this.project.value.taskGroups.filter(taskGroup => taskGroup.id === taskGroupId)[0].tasks.push(task);
        if(this.project.value.taskGroups.filter(taskGroup => taskGroup.id === taskGroupId)[0].tasks){
          this.expandedRows.push(taskGroupId);
        }
        this.mapToTreeData();
      }
    });
  }

  mapToTreeData(){
    this.project.pipe(
      map(project => {
        if(project !== null){
          let expandedRows: Array<number> = [];
          if(this.expandedRows && this.expandedRows.length > 0){
            expandedRows = this.expandedRows;
          }
          return project.taskGroups.map(taskGroup => {
            const data = {
              id: taskGroup.id,
              name: taskGroup.name
            }
            taskGroup.tasks.map(task => {
              return {
                name: task.name,
                owner: task.owner,
                status: task.status,
                startDate: task.dueDate,
                dueDate: task.dueDate,
                priority: task.priority
              }
            });
            const tasks = taskGroup.tasks.map(task => {
              return {
                data: {
                  id: task.id,
                  name: task.name,
                  owner: task.owner,
                  status: task.status,
                  startDate: task.dueDate,
                  dueDate: task.dueDate,
                  priority: task.priority,
                  description: task.description
                },
                children: []
              }
            });
            return {
              data: data,
              expanded: expandedRows.includes(data.id),
              children: tasks
            }
          })
        }
        return [];
      })
    ).subscribe(data => {
      this.taskGroups = data
    })
  }

  //zapis na dany projekt
  onExpand(event: Event){
    // @ts-ignore
    this.expandedRows.push(event.node.data.id)
    this.localStorage.saveExpandedData(this.expandedRows);
  }

  onCollapse(event: Event){
    // @ts-ignore
    this.expandedRows = this.expandedRows.filter(row => row !== event.node.data.id)
    this.localStorage.saveExpandedData(this.expandedRows);
  }

  deleteTask(taskId: number){
    this.projectService.deleteTask(taskId).subscribe(() => {
      if(this.project.value !== null){
        let taskGroupId = 0;
        this.project.value.taskGroups.forEach(taskGroup => {
          if(taskGroup.tasks.filter(task => task.id === taskId).length > 0){
            taskGroupId = taskGroup.id
          }
        });
        this.project.value.taskGroups.filter(taskGroup => taskGroup.id === taskGroupId)[0].tasks =
          this.project.value.taskGroups.filter(taskGroup => taskGroup.id === taskGroupId)[0].tasks.filter(task => task.id !== taskId);
        this.mapToTreeData();
      }
    });
  }

  editTask(taskModel: TaskReadModel){
    let taskGroupId = 0;

    this.project.value!.taskGroups.forEach(taskGroup => {
      if(taskGroup.tasks.filter(task => task.id === taskModel.id).length > 0){
        taskGroupId = taskGroup.id
      }
    });

    const ref = this.dialogService.open(EditTaskPageComponent, {
      data: {
        task: taskModel,
        taskId: taskModel.id
      },
      header: 'Edit task',
      width: '80%',
      height: '80%'
    });

    ref.onClose.subscribe(taskResp => {
      let taskIndex = this.project.value!.taskGroups.filter(taskGroup => taskGroup.id === taskGroupId)[0].tasks.findIndex(task => task.id === taskResp.id);

      this.project.value!.taskGroups.filter(taskGroup => taskGroup.id === taskGroupId)[0].tasks[taskIndex] = taskResp;

      this.mapToTreeData();
    });
  }

  editTaskGroup(taskGroupName: string, taskGroupId: number){
    this.projectService.editTaskGroup({name: taskGroupName}, taskGroupId).subscribe();
  }

  deleteTaskGroup(taskGroupId: number){
    this.projectService.deleteTaskGroup(taskGroupId).subscribe(() => {
      if(this.project.value !== null){
        this.project.value.taskGroups =
          this.project.value.taskGroups.filter(taskGroup => taskGroup.id !== taskGroupId);
        this.mapToTreeData();
      }
    });
  }

  getLoggedUserForProject(){
    if(this.project.value !== null && this.authService.user.value !== null){
      return this.project.value.users.filter(user => user.email === this.authService.user.value!.email)[0].role;
    }
    return ProjectUserRole.USER;
  }

  userHasWriteRole(){
    return this.getLoggedUserForProject() === ProjectUserRole.ADMIN;
  }
}
