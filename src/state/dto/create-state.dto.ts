import { IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateStateDto {
    
    @IsString()
    public readonly name:string;
    
    @IsNumber()
    @IsInt()
    @IsPositive()
    public readonly order:number;
    
}
