import { OrderItemDto } from "./orderitem.dto";

export class CreateOrderDto {
   userId : number
  items: OrderItemDto[]
}