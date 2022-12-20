import { IsString } from "class-validator";

export class CreateStateDto {
    
    @IsString()
    public readonly name:string;
    
}
