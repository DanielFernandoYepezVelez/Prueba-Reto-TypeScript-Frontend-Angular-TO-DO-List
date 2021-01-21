export interface ResponseCreateSubTaskServer {
    mensaje: string;
    tareaCompleta: Tarea;
}

export interface Tarea {
    id: number;
    name: string;
    createdAt: Date;
    tarea?: Tarea;
}