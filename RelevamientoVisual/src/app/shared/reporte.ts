import { Tipo } from "./enum/Tipo";

export interface Reporte{
    type: Tipo;
    url: string;
    name: string;
    fecha: string;
    likes: number;
    dislikes: number;
}