import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('state')
export class State {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true
    })
    public readonly name:string;
    
}
