import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber,  IsString } from "class-validator";

export class PaginationDto {
    @ApiProperty({example : '2' , description : 'Page Number'})
     @IsString()
    page : string ;
     @ApiProperty({example : '10' , description : 'Load Limit'
     })
      @IsString()
    limit : string ;
@ApiProperty({example : 'Macbook', description : 'Search By Name'})
     @IsString()
    search?: string ;
    @IsString()
    @ApiProperty({example : '100' , description : 'Sort by price '})
    sortBy? : string ;
    @ApiProperty({example : 'asc', description : 'List  asc or desc '})
    @IsString()
    order? : string;
}