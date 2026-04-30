import { Component, inject, input, Input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  UserId=input.required<string>();

  private tasksService=inject(TasksService)

  userTasks=computed(()=>this.tasksService.allTasks().filter(
    (task) =>task.userId===this.UserId()
  ))
}
