import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createorderDto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
