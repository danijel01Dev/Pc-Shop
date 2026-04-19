import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'test@mail.com' })
  email: string;

  @ApiProperty({ example: 'USER' })
  role: string;

  @ApiProperty({ example: '2026-01-01T12:00:00Z' })
  createdAt: Date;
}

export class UserEmailDto {
  @ApiProperty({ example: 'test@mail.com' })
  email: string;
}
export class UserRoleDto {
    @ApiProperty({ example : 'ADMIN'})
    role : string;
}
