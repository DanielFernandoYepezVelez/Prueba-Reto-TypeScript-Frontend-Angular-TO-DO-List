import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

/* Services */
import { TaskService } from '../../services/task.service';
import { SubtareasService } from '../../services/subtask.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public arrayListTaskId: number[] = [];
  public arrayListTaskName: string[] = [];

  public arrayListSubTaskId: number[] = [];
  public arrayListSubTaskName: string[] = [];

  public arrayTaskComplete: any[] = [];
  
  constructor(private taskService: TaskService, public subtaskService: SubtareasService) { }

  /* Hay Que Trabajar En La Parte De Recargar La Pagina, Especialmente En El NgOnit (BUG) */

  public guardarTareaPrincipal(forma: NgForm): void {
    if (forma.valid) {
      this.taskService.createTask(forma.value).subscribe(() => {
        this.taskService.mainTasks().subscribe(res => {

          this.arrayListTaskId = res.map(task => task.id);
          this.arrayListTaskName = res.map(task => task.name);

          const taskInicial = { id: 0, name: '' };

          if (this.arrayListTaskId.length > 1 && this.arrayListTaskName.length > 1) {
            taskInicial.id = this.arrayListTaskId[this.arrayListTaskId.length - 1];
            taskInicial.name = this.arrayListTaskName[this.arrayListTaskName.length - 1];
          } else {
            taskInicial.id = this.arrayListTaskId[0];
            taskInicial.name = this.arrayListTaskName[0];
          }

          this.arrayTaskComplete.push(taskInicial);
          this.arrayListTaskName = this.arrayTaskComplete.map<string>(task => task.name);
          });

          // console.log(this.arrayTaskComplete)
      });
      forma.reset();
    }
  }

  public eliminarTareaPrincipal(index: number): void {
    if (this.arrayTaskComplete[index].subTaskId === undefined || this.arrayTaskComplete[index].subTaskId === undefined || this.arrayTaskComplete[index].subTaskId <= 0 || this.arrayTaskComplete[index].subTaskName <= 0) {
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
        const idTask = this.arrayListTaskId[index];
        
        if (result.isConfirmed) {
          this.taskService.deleteTask(idTask).subscribe(() => {
                                // Todo Funciona Correctamente Gracias Al Index(Misma Posicion De Los Elementos En Los 3 Arrays)
            this.arrayListTaskName.splice(index, 1); // Elimina Los Nombres Del Array De Nombres
            this.arrayListTaskId.splice(index, 1); // Elimina Los Ids Del Array De Ids
            this.arrayTaskComplete.splice(index, 1); // Elimina Los Ids Y Los Nombres Pero Del Objeto
          });
          Swal.fire('Eliminado!', 'Tarea Fue Eliminada.', 'success');
        }
      });
    
    } else {
      Swal.fire({
        title: 'Importante!',
        text: 'Las Tareas Con Sub-Tareas Activas No Se Pueden Eliminar',
        icon: 'warning',
        confirmButtonText: 'Ok!'
      });
    }
  }

  /* --------------------------------------- TAREAS SECUNDARIAS -------------------------------------------- */

  public guardarSubtarea(forma: NgForm, index: number): void {
    if(forma.valid) {
      this.subtaskService.createSubTask(forma.value, this.arrayListTaskId[index]).subscribe(() => {
        this.subtaskService.subtaskIdTask(this.arrayListTaskId[index]).subscribe(res => {
          this.arrayListSubTaskId = res.map(subtask => subtask.id);
          this.arrayListSubTaskName = res.map(subtask => subtask.name);

          /* CONCEPTO IMPORTANTE!!!!! */
          /* En La Posición Cero Del Array Y No Del Objeto, Aunque Se Va A Agregar Al Objeto
             De La Posición 0 Vas Agregar Una Nueva Propidad Para El Objeto Que Este Es Dicha
             Posición Con El Nombre De subTaskId Y subTaskName */
          this.arrayTaskComplete[index].subTaskId = [ this.arrayListSubTaskId ];
          this.arrayTaskComplete[index].subTaskName = [ this.arrayListSubTaskName ];
        });
      });
      forma.reset();
    }
  }

  public eliminarSubTarea(indexTask: number, indexSubTask: number): void {
    const idSubTask: number = this.arrayTaskComplete[indexTask].subTaskId[0][indexSubTask];

    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Las Sub-Tareas Eliminadas No Se Pueden Recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Definitivamente!',
      cancelButtonText: 'Cancelar',

    }).then((result) => {      
      if (result.isConfirmed) {
        this.subtaskService.deleteTask(idSubTask).subscribe(() => {
          this.arrayTaskComplete[indexTask].subTaskId[0].splice(indexSubTask, 1);
          this.arrayTaskComplete[indexTask].subTaskName[0].splice(indexSubTask, 1);
        });        
        Swal.fire('Eliminado!', 'Sub-Tarea Fue Eliminada.', 'success');
      }
    });
  }
}
