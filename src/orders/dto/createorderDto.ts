import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { OrderItemDto } from "./orderitem.dto";

export class CreateOrderDto {
 
 @ApiProperty({example : '12345' , description : 'User Id '})
  userId : number
  @ApiProperty({
  type: [OrderItemDto],
  example: [
    { productId: 1, quantity: 2 },
  ],
  description: 'List of items in order',
})
  items: OrderItemDto[]
}
