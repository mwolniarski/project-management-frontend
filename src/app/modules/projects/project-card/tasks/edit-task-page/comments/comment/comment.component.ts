import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../../../../model/Comment.model";
import {AuthService} from "../../../../../../../auth/auth.service";
import {UserReadModel} from "../../../../../model/UserReadModel.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  isEdited = false;

  // @ts-ignore
  @Input('comment') comment: CommentModel;
  // @ts-ignore
  @Input('taskId') taskId: number;
  // @ts-ignore
  @Input('usersList') usersList: Array<UserReadModel>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    if(this.comment.content.includes("@@@@")){
      let index = this.comment.content.indexOf("@@@@")
    }
  }

  getActualUserEmail(){
    return this.authService.user.value!.email;
  }
}
