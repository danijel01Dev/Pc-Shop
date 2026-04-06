import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createorderDto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from 'src/products/dto/paginationDto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/jwt/role.guard';
import { Roles } from 'src/auth/jwt/role.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
@UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req , @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id
    return this.ordersService.create(userId, createOrderDto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll(@Query()pagdto : PaginationDto) {
    return this.ordersService.findAll(pagdto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  findDelivered(@Query()pagdto : PaginationDto) {
    return this.ordersService.findDelivered(pagdto);
  }
@UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req , @Param('id') id: string ) {
    const userId = req.user.id
    return this.ordersService.findOne(userId , +id);
  }
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN')
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.adminOrderUpdate(+id, updateOrderDto);
  }
@UseGuards(JwtAuthGuard)
  @Patch(':id')
  orderCancel(@Req() req ,@Param('id') id: string) {
    const userId = req.user.id
    return this.ordersService.cancelOrder(userId , +id);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch('cancel/:id')
   adminCancelOrder(@Param('id')id : string){
    return this.ordersService.adminCancelOrder(+id)
   }

}
