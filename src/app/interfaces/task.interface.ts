export interface ResponseTaskServer {
    tarea: Tarea;
    mensaje: string;
}

export interface ResponseDeleteTaskServer {
    mensaje: string;
}

export interface Tarea {
    id: number;
    name: string;
    createdAt: Date;
}