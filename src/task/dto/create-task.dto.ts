import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
    
    @IsString()
    public readonly name:string;

    @IsString()
    @IsOptional()
    public readonly description?:string;
    
    @IsUUID('4')
    @IsOptional()
    public readonly typeId?:string;

    @IsUUID('4')
    public readonly stateId:string;

    @IsUUID('4')
    public readonly personId:string;

}
