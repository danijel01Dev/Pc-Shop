import { IsNumber } from "class-validator"

export class OrderItemDto {
  productId: number
  @IsNumber()
  quantity: number
}