import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "generated/prisma/enums";

export class UpdateRoleDto{
    @IsEmail()
    email : string;
    @IsEnum(Role)
    role : Role;
}