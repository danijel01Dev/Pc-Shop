import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createorderDto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from '../products/dto/pagination.Dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/jwt/role.guard';
import { Roles } from '../auth/jwt/role.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderResponseDto, PagResponseDto } from './dto/ApiOrder.Dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary : 'Create Order'})
  @ApiResponse({status : 200,
     description : 'Order Created Successfully',
     type : [OrderResponseDto],
  })
  create(@Req() req , @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id
    return this.ordersService.create(userId, createOrderDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({summary : 'Get All Active  Orders '})
  @ApiResponse({status : 200,
    description : 'Orders loaded Successfully',
    type : [PagResponseDto],
  })
  findAll(@Query()pagdto : PaginationDto) {
    return this.ordersService.findAll(pagdto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({summary : 'Get All Delivered Orders'})
  @ApiResponse({status : 200,
    description : 'Orders loaded Successfully',
    type : [PagResponseDto]
  })
  findDelivered(@Query()pagdto : PaginationDto) {
    return this.ordersService.findDelivered(pagdto);
  }
  @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get(':id')
  @ApiOperation({summary : 'Get Order By Id '})
  @ApiResponse({status : 200,
    description : 'Order loaded Successfully',
    type : [OrderResponseDto]
  })
  findOne(@Req() req , @Param('id', ParseIntPipe) id: number ) {
    const userId = req.user.id
    return this.ordersService.findOne(userId , id);
  }
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles('ADMIN')
  @Patch('update/:id')
  @ApiOperation({summary : 'Update Order'})
  @ApiResponse({status : 200,
    description : 'Update',
    type : [OrderResponseDto]
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.adminOrderUpdate(id, updateOrderDto);
  }
  @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({summary: 'Cancel Order '})
  @ApiResponse({status : 200,
    description : 'Order Cancelled successfully',
    type : [OrderResponseDto]
  })
  orderCancel(@Req() req ,@Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id
    return this.ordersService.cancelOrder(userId , id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch('cancel/:id')
  @ApiOperation({summary : 'Order Cancel By Admin'})
  @ApiResponse({status : 200,
    description : 'Order Cancelled successfully',
    type  : [OrderResponseDto]
  })
   adminCancelOrder(@Param('id', ParseIntPipe)id : number){
    return this.ordersService.adminCancelOrder(id)
   }

}
