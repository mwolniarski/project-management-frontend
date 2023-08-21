import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AuthService} from "../../../../../../auth/auth.service";
import {CommentModel} from "../../../../model/Comment.model";
import {ActivatedRoute} from "@angular/router";
import {UserReadModel} from "../../../../model/UserReadModel.model";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  // @ts-ignore
  comments: Array<CommentModel>;

  // @ts-ignore
  @Input('taskId') taskId: number;
  // @ts-ignore
  @Input('usersList') usersList: Array<UserReadModel>;

  ngOnInit(): void {
      this.projectService.getComments(this.taskId).subscribe(comment => this.comments = comment);
  }

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {}
}
