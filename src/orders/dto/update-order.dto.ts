import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createorderDto';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'generated/prisma/enums';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsEnum(OrderStatus)
     status : OrderStatus ;
}
