import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Interfaces */
import { ResponseTaskServer, ResponseDeleteTaskServer, Tarea } from '../interfaces/task.interface';

/* Variables De Entorno */
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * GET --> Para OBTENER Las Tareas Principales
   * <ResponseTaskServer> --> Respuesta Del Servidor
   * <Tarea[]> --> Lo Que Retorna El Observable
   */
  public mainTasks(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.url}/task/tareas`, { headers: this.httpHeaders })
                    .pipe(
                      tap(res => console.log("Servicio: ", /* res */))
                    );
  }

  /**
   * POST --> Para CREAR Tareas Principales
   * <ResponseTaskServer> --> Respuesta Del Servidor
   * <Void> --> Lo Que Retorna El Observable
   */
  public createTask(name: string): Observable<any> {
    return this.http.post<ResponseTaskServer>(`${this.url}/task/crear`, name, { headers: this.httpHeaders })
                    .pipe(
                      /* tap((resServer) => console.log(resServer)), */
                      map((res) => console.log("Tarea Creada: ", /* res.tarea */))
                    );
  }

  /**
   * DELETE --> Para ELIMINAR Las Tareas Principales
   * <ResponseTaskServer> --> Respuesta Del Servidor
   * <Void> --> Lo Que Retorna El Observable
   */
  public deleteTask(id: number, indice: number): Observable<void> {
    return this.http.delete<ResponseDeleteTaskServer>(`${this.url}/task/tarea/${id}`, { headers: this.httpHeaders })
                    .pipe(
                      tap((resServer) => {
                        console.log(resServer.mensaje);
                      }),
                      map((res) => console.log(res))
                    );
  }
}
