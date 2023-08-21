import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectService} from "../../../../../service/project.service";
import {CommentWriteModel} from "../../../../../model/CommentWriteModel.model";
import {UserReadModel} from "../../../../../model/UserReadModel.model";
import {CommentModel} from "../../../../../model/Comment.model";
import {Editor} from "primeng/editor";
import {sanitizeIdentifier} from "@angular/compiler";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  commentContent: string = '';

  // @ts-ignore
  @ViewChild('editor') editor: Editor;

  // @ts-ignore
  @Input() taskId: number;

  // @ts-ignore
  @Input() usersList: Array<UserReadModel>;

  // @ts-ignore
  @Input() comments: Array<CommentModel>;

  @Output() commentsChange = new EventEmitter<Array<CommentModel>>();

  constructor(private projectService: ProjectService) {
  }

  addComment(){
    let commentWriteModel: CommentWriteModel = {
      taskId: this.taskId,
      comment: this.commentContent
    };
    this.projectService.addComments(commentWriteModel).subscribe(response => {
        this.comments.push(response);
        this.commentsChange.emit(this.comments);
    });
  }

  markUser(user: UserReadModel){
    this.commentContent += `@@@@${user.email}@@@@`;
  }

}
