import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Editor} from "primeng/editor";
import {UserReadModel} from "../../../../../model/UserReadModel.model";
import {CommentModel} from "../../../../../model/Comment.model";
import {ProjectService} from "../../../../../service/project.service";
import {CommentWriteModel} from "../../../../../model/CommentWriteModel.model";

@Component({
  selector: 'app-edit-comments',
  templateUrl: './edit-comments.component.html',
  styleUrls: ['./edit-comments.component.css']
})
export class EditCommentsComponent {

  // @ts-ignore
  @ViewChild('editor') editor: Editor;
  // @ts-ignore
  @Input() isEdited: boolean;
  // @ts-ignore
  @Input() comment: CommentModel;
  // @ts-ignore
  @Input() taskId: number;
  @ViewChild('users') users: any;
  // @ts-ignore
  @Input() usersList: Array<UserReadModel>;

  @Output() commentChange = new EventEmitter<CommentModel>();
  @Output() isEditedChange = new EventEmitter<boolean>();
  constructor(private projectService: ProjectService) {
  }

  editComment(){
    let commentWriteModel: CommentWriteModel = {
      taskId: this.taskId,
      comment: this.comment.content
    };
    this.projectService.updateComment(commentWriteModel, this.comment.id).subscribe(response => {
      this.comment = response;
      this.isEditedChange.emit(false);
    });
  }

  markUser(user: UserReadModel){
    this.comment.content += `@@@@${user.email}@@@@`;
    this.users.hide();
  }
}
