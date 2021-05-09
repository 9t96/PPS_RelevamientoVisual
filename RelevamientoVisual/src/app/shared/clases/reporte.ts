import { Timestamp } from "rxjs/internal/operators/timestamp";
import { eReaccion } from "../enum/eReaccion";
import { eTipo } from "../enum/eTipo";
import { Reaccion } from "./reaccion";

export interface Reporte{
    doc_id: string;
    type: eTipo;
    url: string;
    name: string;
    fecha: number;
    uid: string;
    hasVoted?: boolean;
    reaccion?: Reaccion;
}