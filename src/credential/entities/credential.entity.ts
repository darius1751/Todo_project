import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity({
    name:'credential'
})
export class Credential {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true        
    })
    public readonly username:string;

    @Column({
        nullable:false   
    })
    public readonly password:string;
    
}
