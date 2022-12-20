import { Credential } from "src/credential/entities/credential.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('person')
export class Person { 
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    public readonly name:string;

    @OneToOne(() => Credential,{
        nullable:false,
        cascade:true,
        onUpdate:'CASCADE'        
    })
    @JoinColumn()
    public readonly credential:Credential;

    @Column({
        unique:true
    })
    public readonly email:string;

    @Column({
        nullable:true
    })
    public readonly phone:string;
    
    @CreateDateColumn({
        type:'timestamp',
        nullable:false
    })
    public readonly createdAt:string;

    @Column({
        type:'timestamp',
        nullable:true,
        default:null
    })
    public readonly updatedAt:string;
}
