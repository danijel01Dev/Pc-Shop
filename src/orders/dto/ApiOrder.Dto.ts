import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "@prisma/client";
import { OrderItemDto } from "./orderitem.dto";



export class OrderResponseDto {
     @ApiProperty({example : 123423})
    id : number ;
    @ApiProperty({example : 43 })
  total : number
  @ApiProperty({ example : 1235})
  orderNumber : number ;
 @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
status: OrderStatus;
  @ApiProperty({example : '123'})
  userId : number;
  @ApiProperty({ type: [OrderItemDto] })
items: OrderItemDto[];
  @ApiProperty({example : '2026-01-01T12:00:00Z'})
createdAt : Date;
}


export class PagResponseDto {
    @ApiProperty({type : [OrderResponseDto]})
    order : [OrderResponseDto]
    @ApiProperty({example : 50})
    total : number ;
    @ApiProperty({example : 2})
      page : number ;
    @ApiProperty({example : 10})
      limit : number ;
    @ApiProperty({example : 5})
      totalPages : number
}




