import { IsHexColor, IsString } from "class-validator";

export class CreateTypeDto {
    
    @IsString()
    public readonly name:string;
    
    @IsHexColor()
    public readonly hexColor:string;
}
