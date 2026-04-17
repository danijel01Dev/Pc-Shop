import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "generated/prisma/enums";

export class UpdateRoleDto{
    @ApiProperty({ example : 'user.guest993@gmail.com' , description : 'User E mail'})
    @IsEmail()
    email : string;
    @ApiProperty({example : 'USER' , description : 'User Role update '})
    @IsEnum(Role)
    role : Role;
}