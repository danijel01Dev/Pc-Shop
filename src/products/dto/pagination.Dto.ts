import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: '2', description: 'Page Number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
  @ApiProperty({ example: '10', description: 'Load Limit' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
  @ApiProperty({ example: 'Macbook', description: 'Search By Name' })
  @IsOptional()
  @IsString()
  search?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '100', description: 'Sort by price ' })
  sortBy?: string;
  @ApiProperty({ example: 'asc', description: 'List  asc or desc ' })
  @IsOptional()
  @IsString()
  order?: string;
}
