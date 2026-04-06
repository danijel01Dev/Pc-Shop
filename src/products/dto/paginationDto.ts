import { IsBoolean, IsNumber,  IsString } from "class-validator";

export class PaginationDto {
    
     @IsString()
    page : string ;
   
      @IsString()
    limit : string ;

     @IsString()
    search?: string ;
    @IsString()
    sortBy? : string ;
    @IsString()
    order? : string;
}