import { IsEmail, IsString, MinDate, MinLength } from "class-validator"

export class CreateUserDto {
 
 
     @IsEmail()
     @IsString()
    email  : string 
    @IsString()
    @MinLength(6)
 password : string
 @IsString()
 refreshToken? : string

}
