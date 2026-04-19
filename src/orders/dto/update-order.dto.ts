import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createorderDto';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({example : 'PENDING' , description : 'Order Status Update'})
    @IsEnum(OrderStatus)
     status : OrderStatus ;
}
