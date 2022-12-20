import { IsString,Matches,MaxLength } from "class-validator";

export class LoginCredentialDto{
    
    @IsString()
    public readonly username:string;
    
    @Matches(/^\w{5,}\d{1,}\W+/)
    @MaxLength(18)
    public readonly password:string;
}