import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('type')
export class Type {
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true
    })
    public readonly name:string;

    @Column({
        unique:true,
        name:'hex_color'
    })
    public readonly hexColor:string;
}
