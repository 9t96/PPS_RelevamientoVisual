import { eReaccion } from "../enum/eReaccion";

export interface Reaccion{
    reaction_id: string;
    likes: number;
    votantes: Array<any>;
}

