import { CreateStateDto } from "src/state/dto/create-state.dto";

export const statesSeed:CreateStateDto[] = [
    {
        name:'Preparacion',
        order:1
    },
    {
        name:'Proceso',
        order:2
    },
    {
        name:'Completado',
        order:3
    }
]