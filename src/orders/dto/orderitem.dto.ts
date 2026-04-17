import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class OrderItemDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;
}
