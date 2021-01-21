import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/* Services */
import { TaskService } from '../../services/task.service';
import { SubtareasService } from '../../services/subtask.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public arrayListTaskId: number[] = [];
  public arrayListTaskName: string[] = [];
  
  public arrayListSubTaskId: number[] = [];
  public arrayListSubTaskName: string[] = [];

  public objectTask: any = [];
  
  // public arrayListSubTaskAll = [[this.arrayListSubTaskId], [this.arrayListSubTaskName]];

  constructor(private taskService: TaskService, public subtaskService: SubtareasService) { }

  ngOnInit(): void {
    this.taskService.mainTasks().subscribe(res => { 
      this.arrayListTaskId = res.map(task => task.id);
      this.arrayListTaskName = res.map(task => task.name);
    });
    /* this.subtaskService.subtaskIdTask(this.arrayListTaskId[index]).subscribe((res) => {
      this.arrayListSubTaskId = res.map(subtask => subtask.id);
      this.arrayListSubTaskName = res.map(subtask => subtask.name);
    }); */
  }

  public guardarTareaPrincipal(forma: NgForm): void {
    if (forma.valid) {
      this.taskService.createTask(forma.value).subscribe(() => {
        this.taskService.mainTasks().subscribe(res => { 
          this.arrayListTaskId = res.map(task => task.id);
            this.arrayListTaskName = res.map(task => task.name);

            const taskComplete = {
                id: this.arrayListTaskId,
                name: this.arrayListTaskName,
            }

              this.objectTask.push(taskComplete);
              console.log(this.objectTask)
          });
      });
      forma.reset();
    }
  }

  /* public eliminarTareaPrincipal(index: number): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Las Tareas Eliminadas No Se Pueden Recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Definitivamente!',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        // this.taskService.deleteTask(this.taskService.task.taskIds[index], index).subscribe();
        Swal.fire('Eliminado!', 'Tu Tarea Fue Eliminada.', 'success');
      }
    });
  } */

  /* --------------------------------------- TAREAS SECUNDARIAS -------------------------------------------- */

  public guardarSubtarea(forma: NgForm, index: number): void {
    if(forma.valid) {
      this.subtaskService.createSubTask(forma.value, this.arrayListTaskId[index]).subscribe(() => {
        this.subtaskService.subtaskIdTask(this.arrayListTaskId[index]).subscribe((res) => {
          this.arrayListSubTaskId = res.map(subtask => subtask.id);
          this.arrayListSubTaskName = res.map(subtask => subtask.name);  
        

          this.objectTask[index].subTaskId = [ this.arrayListSubTaskId ];
          this.objectTask[index].subTaskName = [ this.arrayListSubTaskName ]


          console.log(this.objectTask)

        });
      });
      forma.reset();
    }
  }

}
