import { Component, OnInit } from '@angular/core';

/* Services */
import { TaskService } from '../../services/task.service';

/* Interfaces */
import { Tarea } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public mainTasks: Tarea[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.mainTasks().subscribe(
      res => {
        this.mainTasks = res;
      });
  }

}
