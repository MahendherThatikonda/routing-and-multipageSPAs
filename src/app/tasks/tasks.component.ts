import { Component, DestroyRef, inject, input, Input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  UserId=input.required<string>();
//  order=input<'asc'|'desc'>();
  order?:'asc'|'desc'
  private tasksService=inject(TasksService)
  private destroyRef=inject(DestroyRef);
  userTasks=computed(()=>this.tasksService.allTasks().filter(
    (task) =>task.userId===this.UserId()
  ));
  private activatedRoute=inject(ActivatedRoute);
  ngOnInit(){
      const subscription=this.activatedRoute.queryParams.subscribe({
      next:(params)=>(this.order=params['order']),
    });
    this.destroyRef.onDestroy(()=>subscription.unsubscribe())
  }
}
