import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../auth/auth.service";
import {Notification} from "../../../../auth/model/Notification";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit{

  // @ts-ignore
  notifications: Array<Notification> | null;
  // @ts-ignore
  unreadCount: string;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.notifications.subscribe(notifications => {
      this.notifications = notifications;
      if(notifications !== null){
        this.unreadCount = notifications?.filter(notification => notification.status === 'UNREAD').length.toString();
      }
    });
    setInterval(() => this.authService.getNotifications(), 5000);
  }

  updateNotification(notificationId: number){
    this.authService.updateNotification(notificationId).subscribe(() => {
      let filterElement = this.notifications?.filter(n => n.id === notificationId)[0];
      filterElement!.status = "READ";
      this.unreadCount = this.notifications?.filter(notification => notification.status === 'UNREAD').length.toString()!;
    });
  }
}
