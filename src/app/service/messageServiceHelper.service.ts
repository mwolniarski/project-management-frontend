import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";

@Injectable()
export class MessageServiceHelper {

  constructor(private messageService: MessageService) {}

  displayMessage(type: string, content: string){
    this.messageService.add({key: 'mainMessage',severity: type, summary: content});

    setTimeout(() => this.messageService.clear(), 5000);
  }
}
