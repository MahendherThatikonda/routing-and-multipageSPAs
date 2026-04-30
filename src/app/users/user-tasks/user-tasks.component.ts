import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit{
  //userId=input.required<string>();
  userName=''
  private destroyref=inject(DestroyRef);
  private userService=inject(UsersService);
  private activatedRoute=inject(ActivatedRoute)
  //userName=computed(()=> this.userService.users.find(u=>u.id === this.userId())?.name)

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription= this.activatedRoute.paramMap.subscribe({
      next:paraMap=> {
       this.userName=  this.userService.users.find((u)=>u.id===paraMap.get('userId'))?.name||''
      },
    })
    this.destroyref.onDestroy(()=>subscription.unsubscribe())
  }
}
