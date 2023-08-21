import {UserReadModel} from "./UserReadModel.model";

export interface CommentModel {
  id: number;

  content: string;

  createdBy: UserReadModel;

  createdTime: Date;
}
