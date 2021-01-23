import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Interfaces */
import { ResponseCreateSubTaskServer, Tarea } from '../interfaces/subtask.interface';

/* Variables De Entorno */
import { environment } from '../../environments/environment';
import { ResponseDeleteTaskServer } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class SubtareasService {
  private url: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  /**
   * GET --> Para OBTENER Las SubTareas Por Id
   * <Tarea[]> --> Respuesta Del Servidor
   * <Tarea[]> --> Lo Que Retorna El Observable (PENDIENTE POR OPTIMIZAR)
   */
  public subtaskIdTask(idTask: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.url}/subtask/subtareas/${idTask}`, { headers: this.httpHeaders })
      .pipe(
        tap((res) => {/* console.log("Lista Todas Las SubTareas: ",  res ), */}),
      );
  }

  /**
   * POST --> Para CREAR Las SubTareas
   * <ResponseCreateSubTaskServer> --> Respuesta Del Servidor
   * <Void> --> Lo Que Retorna El Observable
   */
  public createSubTask(name: string, id: number): Observable<void> {
    return this.http.post<ResponseCreateSubTaskServer>(`${this.url}/subtask/crear/${id}`, name, { headers: this.httpHeaders })
      .pipe(
        /* tap((resServer) => console.log(resServer)), */
        map((res) => { /*console.log("Se Crea Tarea Completa:", res.tareaCompleta.tarea)*/}),
      );
  }

  /**
   * DELETE --> Para ELIMINAR Las SubTareas Por Id
   * <ResponseDeleteSubTaskServer> --> Respuesta Del Servidor
   * <Void> --> Lo Que Retorna El Observable
   */
  public deleteTask(id: number): Observable<void> {
    return this.http.delete<ResponseDeleteTaskServer>(`${this.url}/subtask/subtarea/${id}`, { headers: this.httpHeaders })
      .pipe(
        /* tap(resServer => console.log(resServer)), */
        map((res) => {/* console.log(res.mensaje) */}),
      );
  }

}