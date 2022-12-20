import { Person } from "src/person/entities/person.entity";
import { State } from "src/state/entities/state.entity";
import { Type } from "src/type/entities/type.entity";
import { Column, Entity, PrimaryColumn, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm";

@Entity('task')
export class Task {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;
    
    @Column()
    public readonly name:string;

    @ManyToOne(() => Person,{
        nullable:false,
        cascade:true,
        onUpdate:'CASCADE'
    })
    @JoinColumn()
    public readonly person:Person;
    
    @Column({
        nullable:true
    })
    public readonly description:string;

    @ManyToOne(() => Type,{
        cascade:true,
        onUpdate:'CASCADE'
    })
    @JoinColumn()
    public readonly type:Type;

    @ManyToOne(() => State,{
        nullable:false,
        cascade:true,
        onUpdate:'CASCADE',
    })
    @JoinColumn()
    public readonly state:State;

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
